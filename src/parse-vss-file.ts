import * as fs from 'fs';
import * as yaml from 'js-yaml';

export interface VSSObject {
  allowed?: Array<string>;
  type: string;
  description?: string;
  comment?: string;
  datatype?: string;
  default?: string | Array<string>;
  instances?: Array<string>;
  instantiate?: boolean;
  unit?: string;
  min?: string;
  max?: string;
}

export interface IrawVssNode {
  name: string;
  type: string;
  contents: VSSObject;
}
export interface IrawVssNodes extends Array<IrawVssNode> {}

export interface IbranchName {
  fullyQualifiedName: string;
  isInstance: boolean;
}
export interface IbranchNames extends Array<IbranchName> {}

export interface VSSProps {
  vssFile: string;
  prefix?: string;
  generatePrefixBranch?: boolean;
}

export class VSS {
  public nodes: IrawVssNodes;
  private prefix: string;
  constructor(props: VSSProps) {
    const vssFile = props.vssFile;
    this.prefix = props.prefix || '';
    const generatePrefixBranch = props.generatePrefixBranch || false;

    // read in the VSS file as raw nodes and set name and type
    const vss = yaml.load(fs.readFileSync(vssFile, 'utf-8'));
    const rawNodes: IrawVssNodes = this.rawVssNodes(vss);

    // Iterate nodes for "branch" and create intermediate array
    // of branches with the name. If "instances" are provided,
    // create the instances and set the flag accordingly.
    const branches: IbranchNames = this.branchNames(
      rawNodes,
      this.prefix,
      generatePrefixBranch,
    );

    // With all branches created, iterate non-branch values and
    // create the signal nodes on the furthest children nodes that are
    // not instances.
    this.nodes = this.completeVss(rawNodes, branches);
  }

  rawVssNodes(vssYaml: any): IrawVssNodes {
    let rawNodes: IrawVssNodes = [];
    for (const key in vssYaml) {
      rawNodes.push({
        name: `${key}`,
        type: `${vssYaml[key].type}`,
        contents: vssYaml[key],
      });
    }
    return rawNodes;
  }

  // return array of branches from raw nodes
  branchNames(
    rawNodes: IrawVssNodes,
    prefix: string,
    generatePrefixBranch: boolean,
  ): IbranchNames {
    let branchNames: IbranchNames = [];

    if (generatePrefixBranch) {
      let name = '';
      let prefixBranches = prefix.split('.');
      for (const level in prefixBranches) {
        name += prefixBranches[level];
        branchNames.push({
          fullyQualifiedName: `${name}`,
          isInstance: false,
        });
        name += '.';
      }
    }

    for (const rawNode of rawNodes) {
      if (rawNode.type === 'branch') {
        if (rawNode.contents.instances) {
          const instanceNames: Array<string> = this.generateInstanceNames(
            rawNode.contents.instances,
            prefix ? `${prefix}.${rawNode.name}` : `${rawNode.name}`,
          );
          // before adding instances, add the parent first (as an instance)
          branchNames.push({
            fullyQualifiedName: `${prefix}.${rawNode.name}`,
            isInstance: true,
          });
          for (let name in instanceNames) {
            branchNames.push({
              fullyQualifiedName: instanceNames[name],
              isInstance: true,
            });
          }
        } else {
          branchNames.push({
            fullyQualifiedName: `${prefix}.${rawNode.name}`,
            isInstance: false,
          });
        }
      }
    }
    return branchNames;
  }

  generateInstanceNames(
    instanceArray: Array<string>,
    prefix: string,
  ): Array<string> {
    // For each value, generate child branch values
    // This version of the parser supports the example shown here:
    // https://covesa.github.io/vehicle_signal_specification/rule_set/instances/

    // regex for parsing start and end to generate X branches. E.g., "Sensor[1,8]"
    // will create branches of Sensor1, Sensor2, ..., Sensor8
    const instanceCountRegex = /^(?<base>\w+)\[(?<start>\d+),(?<end>\d+)\]/;
    let base = '';
    let startNum = 0;
    let endNum = 0;
    const instance: any = instanceArray[0];
    var returnArray: Array<string> = [];
    var intermediateArray: Array<string> = [];

    // For each array item, process, and then if there are additional array items,
    // process them too and children.

    if (typeof instance === 'string') {
      if (instance.match(instanceCountRegex) != null) {
        let baseNumResp = instance.match(instanceCountRegex) as any;
        base = baseNumResp[1]; // name to use
        startNum = baseNumResp[2]; // starting number - recommended to be 1
        endNum = baseNumResp[3]; // ending number
        for (let i = startNum; i <= endNum; i++) {
          returnArray.push(`${prefix}.${base}${i}`);
          if (instanceArray.length > 1) {
            intermediateArray = this.generateInstanceNames(
              instanceArray.slice(1),
              `${prefix}.${base}${i}`,
            );
            returnArray = returnArray.concat(intermediateArray);
          }
        }
      }
    } else if (Array.isArray(instance)) {
      for (let i = 0; i < instance.length; i++) {
        returnArray.push(`${prefix}.${instance[i]}`);
        if (instanceArray.length > 1) {
          intermediateArray = this.generateInstanceNames(
            instanceArray.slice(1),
            `${prefix}.${instance[i]}`,
          );
          returnArray = returnArray.concat(intermediateArray);
        }
      }
    } else {
      // Error parsing instances
      throw new Error('VSS spec instances provided element not valid');
    }
    return returnArray;
  }

  // Parse all nodes against expanded branches, return complete VSS
  // set of nodes
  completeVss(rawNodes: IrawVssNodes, branches: IbranchNames): IrawVssNodes {
    let completeVss: IrawVssNodes = [];

    // First create all the branch nodes
    for (const branch of branches) {
      // add branch  - prefix already part of fullyQualifiedName
      completeVss.push({
        name: branch.fullyQualifiedName,
        type: 'branch',
        contents: {
          type: 'branch',
          description: 'VSS generated branch',
        },
      });
    }

    for (const node in rawNodes) {
      const workingNode = rawNodes[node];
      if (workingNode.type !== 'branch') {
        // check if node has parent branch to evaluate
        if (workingNode.name.split('.').length > 1) {
          // get all branches that contain parent branch
          const parentBranches = this.getParentBranches(
            workingNode.name,
            branches,
          );
          if (parentBranches.some((el) => el.isInstance === true)) {
            // get all equally longest branches with isInstance then create
            // signal node on the furthest children
            const longestBranches = this.getLongestBranches(parentBranches);
            for (const branch in longestBranches) {
              completeVss.push({
                name:
                  longestBranches[branch].fullyQualifiedName +
                  '.' +
                  workingNode.name.split('.')[
                    workingNode.name.split('.').length - 1
                  ],
                type: workingNode.type,
                contents: workingNode.contents,
              });
            }
          } else {
            // no parent - add to directly (with prefix if provided)
            completeVss.push({
              name: this.prefix
                ? this.prefix + '.' + workingNode.name
                : workingNode.name,
              type: workingNode.type,
              contents: workingNode.contents,
            });
          }
        } else {
          // no parent - add to node list directly (with prefix if provided)
          completeVss.push({
            name: this.prefix
              ? this.prefix + '.' + workingNode.name
              : workingNode.name,
            type: workingNode.type,
            contents: workingNode.contents,
          });
        }
      }
    }
    return completeVss;
  }

  getParentBranches(name: string, branches: IbranchNames): IbranchNames {
    let matchingBranches: IbranchNames = [];
    const parent: string = name
      .split('.')
      .slice(0, name.split('.').length - 1)
      .join('.');
    for (const branch in branches) {
      if (branches[branch].fullyQualifiedName.includes(parent + '.')) {
        matchingBranches.push(branches[branch]);
      }
    }
    return matchingBranches;
  }

  getLongestBranches(branches: IbranchNames): IbranchNames {
    let longestBranches: IbranchNames = [];
    let longestLength: number = 0;

    for (let i = 0; i < branches.length; i++) {
      if (branches[i].fullyQualifiedName.length > longestLength) {
        longestLength = branches[i].fullyQualifiedName.length;
      }
    }
    for (const branch in branches) {
      if (branches[branch].fullyQualifiedName.length === longestLength) {
        longestBranches.push(branches[branch]);
      }
    }
    return longestBranches;
  }
}