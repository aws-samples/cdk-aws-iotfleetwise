import boto3
import json

def on_event(event, context):
    print(f'on_event {event} {context}')
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
    print(f"create new resource with props {props}")
    client=boto3.client('iotfleetwise')
    
    response = client.create_campaign(
      campaignName = props['campaign_name'],
      signalCatalogArn = props['signal_catalog_arn'],
      targetArn = props['target_arn'],
      collectionScheme = json.loads(props['collection_scheme']),
      signalsToCollect = json.loads(props['signals_to_collect'])
    )
    print(f"create_campaign response {response}")
    
    # response = client.update_campaign(
    #   campaignName = props['campaign_name'],
    #   action = 'APPROVE'
    # )
    # print(f"update_campaign response {response}")
    return { 'PhysicalResourceId': props['campaign_name'] }

def on_update(event):
    physical_id = event["PhysicalResourceId"]
    props = event["ResourceProperties"]
    print(f"update resource {physical_id} with props {props}")
    raise Exception("update not implemented yet")
    #return { 'PhysicalResourceId': physical_id }

def on_delete(event):
    physical_id = event["PhysicalResourceId"]
    props = event["ResourceProperties"]
    print(f"delete resource {props['campaign_name']} {physical_id}")
    client=boto3.client('iotfleetwise')

    response = client.delete_campaign(
      campaignName = props['campaign_name'],
    )
    print(f"delete_campaign response {response}")

    return { 'PhysicalResourceId': physical_id }
