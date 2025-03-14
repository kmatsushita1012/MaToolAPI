import { APIGatewayProxyEvent } from "aws-lambda";
import { errorResponse } from "../../utils/responses";
import { client } from "../..";
import DistrictController from "../controllers/DistrictController";
import { badRequest, notFound } from "../../utils/error";

const controller = new DistrictController(client);

const districtRouter = async (event: APIGatewayProxyEvent) => {
  const path = event.path;
  const httpMethod = event.httpMethod;
  if (!path) {
    return errorResponse(badRequest());
  }
  if (path.startsWith("/districts/summaries") && httpMethod == "GET") {
    return await controller.getSummaries(event);
  } else if (path.startsWith("/districts/detail") && httpMethod == "GET") {
    return await controller.getDetail(event);
  } else if (path.startsWith("/districts")) {
    return await controller.post(event);
  } else {
    return errorResponse(notFound());
  }
};

export default districtRouter;
