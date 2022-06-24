from pydoc import describe
from collections import Counter
import boto3

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
    
    response = client.create_fleet(
      fleetId = props['fleet_id'],
      description = props['description'],
      signalCatalogArn = props['signal_catalog_arn'],
    )
    print(f"create_fleet response {response}")
    
    for id in props['vehicle_ids']:
      print(f"associating vehicle id {id} to fleet {props['fleet_id']}")    
      response = client.associate_vehicle(
        fleetId = props['fleet_id'],
        vehicleId = id,
      )
      print(f"associate_vehicle response {response}")      

    return { 'PhysicalResourceId': props['fleet_id'] }

def on_update(event):
    physical_id = event["PhysicalResourceId"]
    props = event["ResourceProperties"]
    old_props = event["OldResourceProperties"]
    c = Counter(props['vehicle_ids'])
    c.subtract(old_props['vehicle_ids'])
    client=boto3.client('iotfleetwise')
    for vehicleId, operation in c.items():
        if operation == -1:
            print(f"removing {vehicleId} to {props['fleet_id']}")
            response = client.disassociate_vehicle(
                fleetId = props['fleet_id'],
                vehicleId = vehicleId)
            print(f"disassociate_vehicle response {response}")
        elif operation == 1:
            print(f"adding {vehicleId} to {props['fleet_id']}")
            response = client.associate_vehicle(
                fleetId = props['fleet_id'],
                vehicleId = vehicleId)
            print(f"associate_vehicle response {response}")            
        
    print(f"update resource {physical_id} with props {props}")
    #raise Exception("update not implemented yet")
    return { 'PhysicalResourceId': physical_id }

def on_delete(event):
    physical_id = event["PhysicalResourceId"]
    props = event["ResourceProperties"]
    print(f"delete resource {props['fleet_id']} {physical_id}")
    client=boto3.client('iotfleetwise')

    print(f"list_vehicles_in_fleet {props['fleet_id']}")
    response = client.list_vehicles_in_fleet(fleetId = props['fleet_id'])
    print(f"list_vehicles_in_fleet response {response}")
    for v in response["vehicles"]:
        print(f"disassociate_vehicle {v} from {props['fleet_id']}")
        response = client.disassociate_vehicle(
            fleetId = props['fleet_id'],
            vehicleId = v)
        print(f"disassociate_vehicle response {response}")

    print(f"delete_fleet {props['fleet_id']}")    
    response = client.delete_fleet(
      fleetId = props['fleet_id'],
    )
    print(f"delete_fleet response {response}")

    return { 'PhysicalResourceId': physical_id }
