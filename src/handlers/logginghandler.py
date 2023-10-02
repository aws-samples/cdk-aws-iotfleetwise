import logging as logger
import botocore
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
    logger.info(f"creating FleetWise logging with props {props}")
    ret = {"PhysicalResourceId": props["cloudwatch_log_group_name"]}

    # check if log group exists and create if is doesn't
    logs_client = boto3.client("logs")
    response = logs_client.describe_log_groups(
        logGroupNamePattern=props["cloudwatch_log_group_name"],
    )
    logger.info(f"describe_log_groups response {response}")
    if len(response["logGroups"]) == 0:
        # Log group not found, create
        response = logs_client.create_log_group(
            logGroupName=props["cloudwatch_log_group_name"]
        )

    # putLogging with log group name and log_setting (OFF or ERROR)
    fleetwise_client = boto3.client("iotfleetwise")
    response = fleetwise_client.put_logging_options(
        cloudWatchLogDelivery={
            "logType": props["log_type"],
            "logGroupName": props["cloudwatch_log_group_name"],
        }
    )
    logger.info(f"create_logging response {response}")
    return ret


def on_update(event):
    physical_id = event["PhysicalResourceId"]
    props = event["ResourceProperties"]
    logger.info(f"update FleetWise logging {physical_id} with props {props}")
    logger.exception("update not implemented")
    raise
    # return { 'PhysicalResourceId': physical_id }


def on_delete(event):
    physical_id = event["PhysicalResourceId"]
    props = event["ResourceProperties"]
    logger.info(
        f"delete FleetWise logging {props['cloudwatch_log_group_name']} {physical_id}"
    )
    logs_client = boto3.client("logs")

    if props["keep_log_group"] != "true":
        # first turn off logging for FleetWise
        fleetwise_client = boto3.client("iotfleetwise")
        response = fleetwise_client.put_logging_options(
            cloudWatchLogDelivery={
                "logType": "OFF",
            }
        )
        # delete the CloudWatch log group
        logger.info(f"deleting log group {props['cloudwatch_log_group_name']}")
        try:
            response = logs_client.delete_log_group(
                logGroupName=props["cloudwatch_log_group_name"]
            )
            logger.info(f"delete_log_group response {response}")
        except logs_client.exceptions.ResourceNotFoundException as e:
            logger.warning(f"FleetWise log group not found: {e}, continuing...")
    return {"PhysicalResourceId": physical_id}