import { APIError } from "../utils/Errors";

const successResponse = (body: any, status: number = 200): ApiResponse => {
  try {
    return {
      statusCode: status,
      body: body,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: { error: String(error) },
    };
  }
};

const errorResponse = (error: any): ApiResponse => {
  if (error instanceof APIError) {
    try {
      return {
        statusCode: error.statusCode,
        body: { error: error.message },
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: { error: String(error) },
      };
    }
  } else {
    return {
      statusCode: 500,
      body: { error: String(error) },
    };
  }
};

interface ApiResponse {
  statusCode: number;
  body: any;
}

export { ApiResponse, successResponse, errorResponse };
