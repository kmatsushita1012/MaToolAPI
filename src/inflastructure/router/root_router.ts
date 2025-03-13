import { APIGatewayProxyEvent } from "aws-lambda";
import {
  internalServerErrorResponse,
  notFoundResponse,
} from "../../utils/responses";
import routeRouter from "./route_router";
import districtRouter from "./district_router";
import regionRouter from "./region_router";
import locationRouter from "./location_router";

const rootRouter = async (event: APIGatewayProxyEvent) => {
  const path = event.path;
  if (!path) {
    return internalServerErrorResponse();
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
    return notFoundResponse();
  }
};

export default rootRouter;
