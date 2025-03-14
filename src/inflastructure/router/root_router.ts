import { APIGatewayProxyEvent } from "aws-lambda";
import { errorResponse } from "../../utils/responses";
import routeRouter from "./route_router";
import districtRouter from "./district_router";
import regionRouter from "./region_router";
import locationRouter from "./location_router";
import { badRequest, notFound } from "../../utils/error";

const rootRouter = async (event: APIGatewayProxyEvent) => {
  const path = event.path;
  if (!path) {
    return errorResponse(badRequest());
  }
  if (path.startsWith("/regions")) {
    return await regionRouter(event);
  } else if (path.startsWith("/districts")) {
    return await districtRouter(event);
  } else if (path.startsWith("/routes")) {
    return await routeRouter(event);
  } else if (path.startsWith("/locations")) {
    return await locationRouter(event);
  } else {
    return errorResponse(notFound());
  }
};

export default rootRouter;
