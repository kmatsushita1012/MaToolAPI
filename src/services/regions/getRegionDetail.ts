import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { badRequestResponse, notFoundResponse } from "../../utils/responses";
import { toCamelCase } from "../../utils/formatter";

const tableName = "matool_regions";

const getRegionDetail = async (id: string): Promise<APIGatewayProxyResult> => {

};

export default getRegionDetail;
