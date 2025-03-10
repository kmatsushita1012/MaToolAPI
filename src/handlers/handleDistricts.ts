import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import getDistrictSummaries from "./districts/getDistrictSummaries";
import getDistrictDetail from "./districts/getDistrictDetail";
import postDistricts from "./districts/postDistricts";
import { methodNotAllowedResponse, notFoundResponse } from "../responses";

const handleDistricts = async (
  event: APIGatewayProxyEvent,
  ddbDocClient: DynamoDBDocumentClient
): Promise<APIGatewayProxyResult> => {
  const path = event.path;
  const httpMethod = event.httpMethod;

  if (path && path.startsWith("/districts/summaries")) {
    if (httpMethod == "GET") {
      return await getDistrictSummaries(event, ddbDocClient);
    } else {
      return methodNotAllowedResponse();
    }
  } else if (path && path.startsWith("/districts/detail")) {
    if (httpMethod == "GET") {
      return await getDistrictDetail(event, ddbDocClient);
    } else {
      return methodNotAllowedResponse();
    }
  } else if (path && path.startsWith("/districts")) {
    if (httpMethod == "POST") {
      return await postDistricts(event, ddbDocClient);
    } else {
      return methodNotAllowedResponse();
    }
  } else {
    return notFoundResponse();
  }
};

export default handleDistricts;
