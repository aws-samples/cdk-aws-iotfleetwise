import logging as logger
import boto3
import json

logger.getLogger().setLevel(logger.INFO)

def on_event(event, context):
    logger.info(event)
    request_type = event['RequestType']
    if request_type == 'Create': 
        return on_create(event)
    if request_type == 'Update': 
        return on_update(event)
    if request_type == 'Delete': 
        return on_delete(event)
    raise Exception("Invalid request type: {request_type}")

def on_create(event):
    props = event["ResourceProperties"]
    logger.info(f"create new resource with props {props}")
    client=boto3.client('iotfleetwise')
    response = client.create_signal_catalog(
      name = props['name'],
      description = props['description'],
      nodes = json.loads(props['nodes'])
    )
    logger.info(f"create signal catalog response: {response}")
    return { 'PhysicalResourceId': props['name'] }

def on_update(event):
    physical_id = event["PhysicalResourceId"]
    props = event["ResourceProperties"]
    logger.info(f"update resource {physical_id} with props {props}")
    raise Exception("update not implemented yet")
    #return { 'PhysicalResourceId': physical_id }

def on_delete(event):
    physical_id = event["PhysicalResourceId"]
    props = event["ResourceProperties"]
    logger.info(f"delete resource {props['name']} {physical_id}")
    client=boto3.client('iotfleetwise')
    response = client.delete_signal_catalog(
      name = props['name'],
    )
    logger.info(f"delete signal catalog response: {response}")
    return { 'PhysicalResourceId': physical_id }
