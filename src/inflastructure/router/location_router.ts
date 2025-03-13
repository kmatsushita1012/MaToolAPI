import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {
  badRequestResponse,
  methodNotAllowedResponse,
} from "../../utils/responses";
import { client } from "../..";
import LocationController from "../../controllers/LocationController";

const controller = new LocationController(client);

export const locationRouter = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const path = event.path;
  const httpMethod = event.httpMethod;
  if (!path) {
    return badRequestResponse();
  }

  if (httpMethod == "GET") {
    return await controller.get(event);
  } else if (httpMethod == "POST") {
    return await controller.post(event);
  } else {
    return methodNotAllowedResponse();
  }
};

export default locationRouter;
