import { APIGatewayProxyEvent } from "aws-lambda";
import {
  methodNotAllowedResponse,
  notFoundResponse,
} from "../../utils/responses";
import { client } from "../..";
import DistrictController from "../../controllers/DistrictController";
import postDistricts from "../../services/districts/postDistricts";

const controller = new DistrictController(client);

const districtRouter = async (event: APIGatewayProxyEvent) => {
  const path = event.path;
  const httpMethod = event.httpMethod;

  if (path && path.startsWith("/districts/summaries")) {
    if (httpMethod == "GET") {
      return await controller.getSummaries(event);
    } else {
      return methodNotAllowedResponse();
    }
  } else if (path && path.startsWith("/districts/detail")) {
    if (httpMethod == "GET") {
      return await controller.getDetail(event);
    } else {
      return methodNotAllowedResponse();
    }
  } else if (path && path.startsWith("/districts")) {
    if (httpMethod == "POST") {
      return await controller.post(event);
    } else {
      return methodNotAllowedResponse();
    }
  } else {
    return notFoundResponse();
  }
};

export default districtRouter;
