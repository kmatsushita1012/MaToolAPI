import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { errorResponse } from "../../utils/responses";
import { client } from "../..";
import LocationController from "../controllers/LocationController";
import { methodNotAllowed } from "../../utils/error";

export const locationRouter = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const httpMethod = event.httpMethod;
  const controller = new LocationController(client);

  if (httpMethod == "GET") {
    return await controller.get(event);
  } else if (httpMethod == "POST") {
    return await controller.post(event);
  } else {
    return errorResponse(methodNotAllowed());
  }
};

export default locationRouter;
