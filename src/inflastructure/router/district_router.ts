import { APIGatewayProxyEvent } from "aws-lambda";
import { errorResponse } from "../../utils/responses";
import { client } from "../..";
import DistrictController from "../controllers/DistrictController";
import { badRequest, methodNotAllowed, notFound } from "../../utils/error";

const controller = new DistrictController(client);

const districtRouter = async (event: APIGatewayProxyEvent) => {
  const path = event.path;
  const httpMethod = event.httpMethod;
  if (!path) {
    return errorResponse(badRequest());
  }
  if (path && path.startsWith("/districts/summaries")) {
    if (httpMethod == "GET") {
      return await controller.getSummaries(event);
    } else {
      return errorResponse(methodNotAllowed());
    }
  } else if (path && path.startsWith("/districts/detail")) {
    if (httpMethod == "GET") {
      return await controller.getDetail(event);
    } else {
      return errorResponse(methodNotAllowed());
    }
  } else if (path && path.startsWith("/districts")) {
    if (httpMethod == "POST") {
      return await controller.post(event);
    } else {
      return errorResponse(methodNotAllowed());
    }
  } else {
    return errorResponse(notFound());
  }
};

export default districtRouter;
