import { APIGatewayProxyEvent } from "aws-lambda";
import { errorResponse } from "../../utils/responses";
import { notFound } from "../../utils/error";
import { controllers } from "../..";

const districtRouter = async (event: APIGatewayProxyEvent) => {
  const controller = controllers.district;
  const path = event.path;
  const httpMethod = event.httpMethod;
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
