import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import getRegionsSummaries from "./regions/getRegionSummaries";
import getRegionsDetail from "./regions/getRegionDetail";
import postRegionss from "./regions/postRegions";
import { methodNotAllowedResponse, notFoundResponse } from "../responses";

const handleRegions = async (
  event: APIGatewayProxyEvent,
  client: DynamoDBDocumentClient
): Promise<APIGatewayProxyResult> => {
  const path = event.path;
  const httpMethod = event.httpMethod;

  if (path && path.startsWith("/regions/summaries")) {
    if (httpMethod == "GET") {
      return await getRegionsSummaries(event, client);
    } else {
      return methodNotAllowedResponse();
    }
  } else if (path && path.startsWith("/regions/detail")) {
    if (httpMethod == "GET") {
      return await getRegionsDetail(event, client);
    } else {
      return methodNotAllowedResponse();
    }
  } else if (path && path.startsWith("/regions")) {
    if (httpMethod == "POST") {
      return await postRegionss(event, client);
    } else {
      return methodNotAllowedResponse();
    }
  } else {
    return notFoundResponse();
  }
};

export default handleRegions;
