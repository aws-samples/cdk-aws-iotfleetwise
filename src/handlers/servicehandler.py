import logging as logger
import boto3

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
    raise Exception(f"Invalid request type: {request_type}")

def on_create(event):
    props = event["ResourceProperties"]
    logger.info(f"create new resource with props {props}")
    client=boto3.client('iotfleetwise')
    try:
        response = client.register_account()
        logger.info(f"on_create response {response}")
    except Exception:
        logger.exception("Error during creation, register_account response: {response}")
        raise
    return {}

def on_update(event):
    physical_id = event["PhysicalResourceId"]
    props = event["ResourceProperties"]
    logger.info(f"update resource {physical_id} with props {props}")
    client=boto3.client('iotfleetwise')
    
    response = client.register_account()
    
    logger.info(f"on_update response {response}")
    return { 'PhysicalResourceId': physical_id }

def on_delete(event):
    physical_id = event["PhysicalResourceId"]
    logger.info("delete resource {physical_id}")
    return { 'PhysicalResourceId': physical_id }

def is_complete(event, context):
    physical_id = event["PhysicalResourceId"]
    props = event["ResourceProperties"]
    logger.info(f"is_complete for resource {physical_id} with props {props}")
    client=boto3.client('iotfleetwise')
    response = client.get_register_account_status()
    
    if (
        # check for _any_ failures, and if found, raise exception
        response["accountStatus"] == "REGISTRATION_FAILURE" or response["iamRegistrationResponse"]["registrationStatus"] == "REGISTRATION_FAILURE"
    ):
        logger.error(f"registration failure account status response: {response}")
        raise
    elif (
        # If any registrations pending, return that operation not completed yet
        response["accountStatus"] == "REGISTRATION_PENDING" or response["iamRegistrationResponse"]["registrationStatus"] == "REGISTRATION_PENDING"
    ):
        logger.error(f"registration pending account status response: {response}")
        return {"IsComplete": False}
    # No errors and nothing pending

    return { 'IsComplete': True }