import {
  DynamoDBDocumentClient,
  GetCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { badRequestResponse, notFoundResponse } from "../../utils/responses";
import { toCamelCase } from "../../utils/formatter";
import { compareDate, compareDateAndTime } from "../../utils/dateTimeUtils";
import { makeRouteId } from "../../utils/routeUtils";
import { SimpleDate } from "../../domain/models/share";

const routeTableName = "matool_routes";
const locationTableName = "matool_locations";

const getRouteDetail = async (
  districtId: string,
  date: SimpleDate | null,
  title: string | null
): Promise<APIGatewayProxyResult> => {
  let route;
  const currentFullDate = new Date();
  const currentDate: SimpleDate = {
    year: currentFullDate.getFullYear(),
    month: currentFullDate.getMonth() + 1,
    day: currentFullDate.getDate(),
  };
  if (date && title) {
    const routeId = makeRouteId(date, title);
    route = await getSpecifiedRoute(client, districtId, routeId);
  } else if (!date && !title) {
    const currentTime = {
      hour: currentFullDate.getHours(),
      minute: currentFullDate.getMinutes(),
    };
    route = await getCurrentRoute(client, districtId, {
      date: currentDate,
      time: currentTime,
    });
  } else {
    return badRequestResponse();
  }
  if (!route) {
    return notFoundResponse();
  } else if (route.routeId) {
    delete route.routeId;
  }
  let location = null;
  //当日なら位置情報を配信
  if (compareDate(currentDate, route.date) !== 0) {
    location = await getLocation(client, districtId);
    if (location && location.expirationTime) {
      delete location.expirationTime;
    }
  }
  let response = {
    route: route,
    location: location,
  };
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};

export default getRouteDetail;

const getLocation = async (
  client: DynamoDBDocumentClient,
  districtId: string
) => {
  const data = await client.send(
    new GetCommand({
      TableName: locationTableName,
      Key: {
        district_id: districtId,
      },
    })
  );
  return toCamelCase(data.Item);
};

const getSpecifiedRoute = async (
  client: DynamoDBDocumentClient,
  districtId: string,
  routeId: string
) => {
  const data = await client.send(
    new GetCommand({
      TableName: routeTableName,
      Key: {
        district_id: districtId,
        route_id: routeId,
      },
    })
  );
  return toCamelCase(data.Item);
};

const getCurrentRoute = async (
  client: DynamoDBDocumentClient,
  districtId: string,
  { date, time }: { date: DateType; time: TimeType }
) => {
  // クエリで全てのアイテムを取得
  const data = await client.send(
    new QueryCommand({
      TableName: routeTableName,
      KeyConditionExpression: "district_id = :district_id",
      ExpressionAttributeValues: {
        ":district_id": districtId,
      },
    })
  );
  const items = toCamelCase(data.Items);
  if (!items || items.length === 0) {
    return null;
  }

  return selectCurrentItem(items, { date: date, time: time });
};
const selectCurrentItem = (
  items: Record<string, any>[],
  { date, time }: { date: DateType; time: TimeType }
) => {
  //ソート
  const sortedItems = items.sort((a, b) =>
    compareDateAndTime(
      { dateA: a.date, timeA: a.start },
      { dateB: b.date, timeB: b.start }
    )
  );
  //期間が近いものをreturn
  let target: Record<string, any> = sortedItems[sortedItems.length - 1];
  for (let i = sortedItems.length - 1; i >= 0; i--) {
    const item = sortedItems[i];
    const start = item.start;
    const diffOfStart = compareDateAndTime(
      { dateA: item.date, timeA: start },
      { dateB: date, timeB: time }
    );
    const goal = item.goal;
    let diffOfGoal = compareDateAndTime(
      { dateA: item.date, timeA: goal },
      { dateB: date, timeB: time }
    );
    //時間内
    if (diffOfStart <= 0 && diffOfGoal > 0) {
      return sortedItems[i];
    }
    // 一候補
    if (diffOfStart > 0) {
      target = sortedItems[i];
      continue;
    }
    //候補が適切
    if (diffOfGoal < 0) {
      return target;
    }
  }
};

//テスト
// if (require.main === module) {
//   (async () => {
//     const items = [
//       {
//         date: { year: 2025, month: 3, day: 10 },
//         start: { hour: 9, minute: 0 },
//         goal: { hour: 17, minute: 0 },
//       },
//       {
//         date: { year: 2025, month: 3, day: 11 },
//         start: { hour: 8, minute: 0 },
//         goal: { hour: 16, minute: 0 },
//       },
//     ];
//     const result = selectCurrentItem(items, {
//       date: { year: 2025, month: 3, day: 11 },
//       time: { hour: 18, minute: 0 },
//     });
//     console.log(result);
//   })();
// }
