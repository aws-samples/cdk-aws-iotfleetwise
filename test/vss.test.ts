import * as path from 'path';
// import { Template, Capture } from 'aws-cdk-lib/assertions';
import * as cdk from 'aws-cdk-lib';
//import { aws_timestream as ts } from 'aws-cdk-lib';
import { SignalCatalog } from '../src';


test('Catching SignalCatalog invalid branch instances array', () => {
  const stack = new cdk.Stack();
  /**
  const databaseName = 'FleetWise';
  const tableName = 'FleetWise';

  const database = new ts.CfnDatabase(stack, 'Database', {
    databaseName,
  });

  const table = new ts.CfnTable(stack, 'Table', {
    databaseName,
    tableName,
  });
**/
  expect(() => {
    // Provide invalid instance definition
    new SignalCatalog(stack, 'BadSignalCatalog', {
    //  database,
    //  table,
      description: 'my signal catalog',
      nodes: [],
      vssFile: path.join(__dirname, 'BadVSSInstances.vspec'),
    });
  }).toThrowError(/VSS spec instances provided element not valid/);
});

test('Catch invalid VSS signal type', () => {
  const stack = new cdk.Stack();
  /**
  const databaseName = 'FleetWise';
  const tableName = 'FleetWise';

  const database = new ts.CfnDatabase(stack, 'Database', {
    databaseName,
  });

  const table = new ts.CfnTable(stack, 'Table', {
    databaseName,
    tableName,
  });
**/
  expect(() => {
    // Provide invalid instance definition
    new SignalCatalog(stack, 'BadVssSignalType', {
    //  database,
    //  table,
      description: 'my signal catalog',
      nodes: [],
      vssFile: path.join(__dirname, 'BadVSSSignalType.vspec'),
    });
  }).toThrowError(/Error, invalid object: .+/);
});