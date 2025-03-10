import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { internalServerErrorResponse } from "../../responses";

const getRegionSummaries = async (
  event: APIGatewayProxyEvent,
  ddbDocClient: DynamoDBDocumentClient
): Promise<APIGatewayProxyResult> => {
  try {
    const data = await ddbDocClient.send(
      new ScanCommand({
        TableName: "matool_regions",
      })
    );
    const items = data.Items?.map((item) => ({
      id: item.id,
      name: item.name,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(data.Items),
    };
  } catch (err) {
    console.log(`ERROR : ${err}`);
    return internalServerErrorResponse();
  }
};

export default getRegionSummaries;
