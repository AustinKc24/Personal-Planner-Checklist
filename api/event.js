import { ListTablesCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  UpdateCommand,
  PutCommand,
  DynamoDBDocumentClient,
  ScanCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import crypto from "crypto";

const client = new DynamoDBClient({ region: "us-east-2" });
const docClient = DynamoDBDocumentClient.from(client);

export const fetchEvents = async () => {
  const command = new ScanCommand({
    ExpressionAttributeNames: { "#name": "name" },
    ProjectionExpression: "id, #name, completed",
    TableName: "Events",
  });

  const response = await docClient.send(command);

  return response;
};

export const createEvents = async ({ name, completed }) => {
  const uuid = crypto.randomUUID();
  const command = new PutCommand({
    TableName: "Events",
    Item: {
      id: uuid,
      name,
      completed,
    },
  });

  const response = await docClient.send(command);

  return response;
};

export const updateEvents = async ({ id, name, completed }) => {
  const command = new UpdateCommand({
    TableName: "Events",
    Key: {
      id,
    },
    ExpressionAttributeNames: {
      "#name": "name",
    },
    UpdateExpression: "set #name = :n, completed = :c",
    ExpressionAttributeValues: {
      ":n": name,
      ":c": completed,
    },
    ReturnValues: "ALL_NEW",
  });

  const response = await docClient.send(command);

  return response;
};

export const deleteEvents = async (id) => {
  const command = new DeleteCommand({
    TableName: "Events",
    Key: {
      id,
    },
  });

  const response = await docClient.send(command);

  return response;
};