import { DeleteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {
  unauthorizedResponse,
  forbiddenResponse,
  badRequestResponse,
} from "../../utils/responses";
import { makeRouteId } from "../../utils/routeUtils";
import { SimpleDate } from "../../domain/models/share";

const tableName = "matool_routes";

const deleteRoute = async (
  districtId: String,
  date: SimpleDate,
  userSub: String
): Promise<APIGatewayProxyResult> => {
  if (!userSub) {
    return unauthorizedResponse();
  }
  if (districtId !== userSub) {
    return forbiddenResponse();
  }

  const routeId = makeRouteId(date, title);
  
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Route deleted successfully" }),
  };
};

export default deleteRoute;
