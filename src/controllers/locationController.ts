import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import getLocation from "../handlers/locations/getLocation";
import postLocations from "../handlers/locations/postLocation";

const handleLocations = async (
  event: APIGatewayProxyEvent,
  client: DynamoDBDocumentClient
): Promise<APIGatewayProxyResult> => {
  const path = event.path;
  const httpMethod = event.httpMethod;

  if (httpMethod == "GET") {
    return await getLocation(event, client);
  } else if (httpMethod == "POST") {
    return await postLocations(event, client);
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }
};

export default handleLocations;
