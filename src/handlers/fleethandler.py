from pydoc import describe
from collections import Counter
import logging as logger
import boto3

logger.getLogger().setLevel(logger.INFO)

def on_event(event, context):
    logger.info(f"on_event {event} {context}")
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
    
    response = client.create_fleet(
      fleetId = props['fleet_id'],
      description = props['description'],
      signalCatalogArn = props['signal_catalog_arn'],
    )
    logger.info(f"create_fleet response {response}")
    
    for name in props['vehicle_names']:
      logger.info(f"associating vehicle {name} to fleet {props['fleet_id']}")    
      response = client.associate_vehicle_fleet(
        fleetId = props['fleet_id'],
        vehicleName = name,
      )
      logger.info(f"associate_vehicle response {response}")   

    return { 'PhysicalResourceId': props['fleet_id'] }

def on_update(event):
    physical_id = event["PhysicalResourceId"]
    props = event["ResourceProperties"]
    old_props = event["OldResourceProperties"]
    c = Counter(props['vehicle_names'])
    c.subtract(old_props['vehicle_names'])
    client=boto3.client('iotfleetwise')
    for vehicleName, operation in c.items():
        if operation == -1:
            logger.info(f"removing {vehicleName} to {props['fleet_id']}")
            response = client.disassociate_vehicle_fleet(
                fleetId = props['fleet_id'],
                vehicleName = vehicleName)
            logger.info(f"disassociate_vehicle response {response}")
        elif operation == 1:
            logger.info(f"adding {vehicleName} to {props['fleet_id']}")
            response = client.associate_vehicle_fleet(
                fleetId = props['fleet_id'],
                vehicleId = vehicleName)
            logger.info(f"associate_vehicle response {response}")            
        
    logger.info(f"update resource {physical_id} with props {props}")
    #raise Exception("update not implemented yet")
    return { 'PhysicalResourceId': physical_id }

def on_delete(event):
    physical_id = event["PhysicalResourceId"]
    props = event["ResourceProperties"]
    logger.info(f"delete resource {props['fleet_id']} {physical_id}")
    client=boto3.client('iotfleetwise')

    logger.info(f"list_vehicles_in_fleet {props['fleet_id']}")
    response = client.list_vehicles_in_fleet(fleetId = props['fleet_id'])
    logger.info(f"list_vehicles_in_fleet response {response}")
    for v in response["vehicles"]:
        logger.info(f"disassociate_vehicle_fleet {v} from {props['fleet_id']}")
        response = client.disassociate_vehicle_fleet(
            fleetId = props['fleet_id'],
            vehicleName = v)
        logger.info(f"disassociate_vehicle_fleet response {response}")

    logger.info(f"delete_fleet {props['fleet_id']}")    
    response = client.delete_fleet(
      fleetId = props['fleet_id'],
    )
    logger.info(f"delete_fleet response {response}")

    return { 'PhysicalResourceId': physical_id }
