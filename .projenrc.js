const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Francesco Salamida',
  authorAddress: 'salamida@amazon.com',
  description: 'L2 CDK construct to provision AWS IoT Fleetwise',
  license: 'MIT-0',
  copyrightOwner: 'Amazon.com, Inc. or its affiliates. All Rights Reserved.',
  copyrightPeriod: '',
  cdkVersion: '2.26.0',
  defaultReleaseBranch: 'main',
  name: 'cdk-aws-iotfleetwise',
  repositoryUrl: 'https://github.com/aws-samples/cdk-aws-iotfleetwise.git',
  publishToPypi: {
    distName: 'cdk-aws-iotfleetwise',
    module: 'cdk-aws-iotfleetwise',
  },
  workflowRunsOn: 'ubuntu-18.04',
  releaseWorkflowSetupSteps: [
    {
      name: "Install Python",
      uses: "actions/setup-python@v3",
      with: {
        "python-version": '3.7'
      }
    },
    {
      name: "check python version",
      run: "python -VV"
    }
  ]
});
project.addGitIgnore('__pycache__');
project.addGitIgnore('.DS_Store');
project.addGitIgnore('cdk.out/');
project.addGitIgnore('cdk.context.json');

// Creating python boto3 lambda layer with iot fleetwise support
const url = 'https://docs.aws.amazon.com/iot-fleetwise/latest/developerguide/samples/AwsSdkPythonCli-Iotfleetwise.zip';
const packages = 'botocore-1.23.13-py3-none-any.whl boto3-1.20.13-py3-none-any.whl ';
project.projectBuild.preCompileTask.say('Creating python boto3 lambda layer with iot fleetwise support');
project.projectBuild.preCompileTask.exec('if [ -d lib/layer ]; then rm -Rf lib/layer; fi');
project.projectBuild.preCompileTask.exec('mkdir -p lib/layer');
project.projectBuild.preCompileTask.exec('python -m venv venv', { cwd: 'lib/layer' });
project.projectBuild.preCompileTask.exec(`if [ ! -e cli.zip ]; then wget ${url} -O cli.zip && unzip -o cli.zip ${packages}; fi`, { cwd: 'lib' });
project.projectBuild.preCompileTask.exec(`layer/venv/bin/pip install ${packages} -t ./layer/python`, { cwd: 'lib' });

// Generating documentation for Typescript and python
const task = project.tasks.tryFind('docgen');
task.reset();
task.exec('rm -f doc/api-*.md');
task.exec('jsii-docgen -o doc/api-typescript.md -l typescript');
task.exec('jsii-docgen -o doc/api-python.md -l python');

project.synth();