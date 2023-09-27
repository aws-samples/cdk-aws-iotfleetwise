const { awscdk } = require('projen');

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Francesco Salamida',
  authorAddress: 'salamida@amazon.com',
  description: 'L2 CDK construct to provision AWS IoT Fleetwise',
  license: 'MIT-0',
  copyrightOwner: 'Amazon.com, Inc. or its affiliates. All Rights Reserved.',
  copyrightPeriod: '',
  cdkVersion: '2.96.2',
  defaultReleaseBranch: 'main',
  name: 'cdk-aws-iotfleetwise',
  repositoryUrl: 'https://github.com/aws-samples/cdk-aws-iotfleetwise.git',
  deps: ['js-yaml'],
  devDeps: ['@types/js-yaml'],
  bundledDeps: ['js-yaml'],
  publishToPypi: {
    distName: 'cdk-aws-iotfleetwise',
    module: 'cdk_aws_iotfleetwise',
  },
});

const common_exclude = ['cdk.out', 'cdk.context.json', 'images', 'yarn-error.log', '__pycache__', '.DS_Store', '/tmp/'];
project.npmignore.exclude(...common_exclude);
project.gitignore.exclude(...common_exclude);
project.npmignore.include('/src/handlers/');

// eslint playing nicely with prettier
project.eslint.addExtends('prettier');
project.addDevDeps('eslint-config-prettier');

// Generating documentation for Typescript and python
const task = project.tasks.tryFind('docgen');
task.reset();
task.exec('rm -f doc/api-*.md');
task.exec('jsii-docgen -o doc/api-typescript.md -l typescript');
task.exec('jsii-docgen -o doc/api-python.md -l python');

project.synth();