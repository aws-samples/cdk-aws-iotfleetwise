import json
import logging as logger
import boto3

logger.getLogger().setLevel(logger.INFO)


def on_event(event, context):
    logger.info(f"on_event {event} {context}")
    request_type = event["RequestType"]
    if request_type == "Create":
        return on_create(event, context)
    if request_type == "Update":
        return on_update(event)
    if request_type == "Delete":
        return on_delete(event)
    raise Exception("Invalid request type: {request_type}")


def on_create(event, context):
    props = event["ResourceProperties"]
    logger.info(f"create new resource with props {props}")
    ret = {"PhysicalResourceId": props["vehicle_name"]}

    if props["create_iot_thing"] == "true":
        logger.info("creating certificate for iot thing")
        client = boto3.client("iot")
        response = client.create_keys_and_certificate(setAsActive=True)
        logger.info(f"create_keys_and_certificate response {response}")
        ret["Data"] = {
            "certificateId": response["certificateId"],
            "certificateArn": response["certificateArn"],
            "certificatePem": response["certificatePem"],
            "privateKey": response["keyPair"]["PrivateKey"],
        }
        logger.info(f"describe_endpoint response {response}")
        response = client.describe_endpoint(endpointType="iot:Data-ATS")
        logger.info(f"describe_endpoint response {response}")
        ret["Data"]["endpointAddress"] = response["endpointAddress"]

    client = boto3.client("iotfleetwise")
    
    print("AS PROPS------> ", props)
    response = client.create_vehicle(
        associationBehavior="CreateIotThing" if (props["create_iot_thing"] == "true") else "ValidateIotThingExists",
        vehicleName=props["vehicle_name"],
        modelManifestArn=props["model_manifest_arn"],
        decoderManifestArn=props["decoder_manifest_arn"],
        #attributes=props["attributes"],
    )
    logger.info(f"create_vehicle response {response}")
    return ret


def on_update(event):
    physical_id = event["PhysicalResourceId"]
    props = event["ResourceProperties"]
    logger.info(f"update resource {physical_id} with props {props}")
    raise Exception("update not implemented yet")
    # return { 'PhysicalResourceId': physical_id }


def on_delete(event):
    physical_id = event["PhysicalResourceId"]
    props = event["ResourceProperties"]
    logger.info(f"delete resource {props['vehicle_name']} {physical_id}")
    client = boto3.client("iotfleetwise")

    response = client.delete_vehicle(vehicleName=props["vehicle_name"])
    logger.info(f"delete_vehicle response {response}")

    if props["create_iot_thing"] == "true":
        client = boto3.client("iot")

        response = client.list_thing_principals(thingName=props["vehicle_name"])
        logger.info(f"list_thing_principals response {response}")

        for cert in response["principals"]:
            logger.info(f"delete_certificate {cert}")
            response = client.delete_certificate(certificateId=cert, forceDelete=True)
            logger.info(f"delete_certificate response {response}")

        logger.info(f"delete_thing")
        response = client.delete_thing(thingName=props["vehicle_name"])
        logger.info(f"delete_thing response {response}")
    return {"PhysicalResourceId": physical_id}