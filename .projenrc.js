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
    module: 'cdk_aws_iotfleetwise',
  },
  releaseToNpm: true,
  releaseEveryCommit: true,
  // workflowRunsOn: 'ubuntu-18.04',
  // releaseWorkflowSetupSteps: [
  //   {
  //     name: 'Install python',
  //     uses: 'actions/setup-python@v3',
  //     with: {
  //       'python-version': '3.7',
  //     },
  //   },
  //   {
  //     name: 'Install package dependencies',
  //     run: 'sudo apt update && sudo apt install -y wget unzip zip',
  //   },
  // ],
});

const common_exclude = ['cdk.out', 'cdk.context.json', 'images', 'yarn-error.log', '__pycache__', '.DS_Store', '/tmp/'];
project.npmignore.exclude(...common_exclude);
project.gitignore.exclude(...common_exclude);
project.npmignore.include('/src/handlers/');

// Creating python boto3 lambda layer with iot fleetwise support
// const url = 'https://docs.aws.amazon.com/iot-fleetwise/latest/developerguide/samples/AwsSdkPythonCli-Iotfleetwise.zip';
// const packages = 'botocore-1.23.13-py3-none-any.whl boto3-1.20.13-py3-none-any.whl ';
// project.projectBuild.preCompileTask.say('Creating python boto3 lambda layer with iot fleetwise support');
// project.projectBuild.preCompileTask.exec('if [ -d tmp/layer ]; then rm -Rf tmp/layer; fi');
// project.projectBuild.preCompileTask.exec('mkdir -p lib');
// project.projectBuild.preCompileTask.exec('mkdir -p tmp/layer');
// project.projectBuild.preCompileTask.exec('python -m venv venv', { cwd: 'tmp/layer' });
// project.projectBuild.preCompileTask.exec(`if [ ! -e cli.zip ]; then wget ${url} -O cli.zip && unzip -o cli.zip ${packages}; fi`, { cwd: 'tmp' });
// project.projectBuild.preCompileTask.exec(`layer/venv/bin/pip install ${packages} -t ./layer/python`, { cwd: 'tmp' });
// project.projectBuild.preCompileTask.exec('zip -qr ../../lib/layer.zip *', { cwd: 'tmp/layer' });

// Generating documentation for Typescript and python
const task = project.tasks.tryFind('docgen');
task.reset();
task.exec('rm -f doc/api-*.md');
task.exec('jsii-docgen -o doc/api-typescript.md -l typescript');
task.exec('jsii-docgen -o doc/api-python.md -l python');

// const release_task = project.tasks.tryFind('release');
// const steps = release_task.steps;
// steps.pop();
// project.tasks.removeTask('release');
// project.tasks.addTask('release', {
//   steps: steps,
// });

project.synth();