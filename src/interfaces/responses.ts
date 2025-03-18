import { APIError } from "../utils/Errors";

const successResponse = (body: any, status: number = 200): ApiResponse => {
  try {
    return {
      status: status,
      body: JSON.stringify(body),
    };
  } catch (error) {
    return {
      status: 500,
      body: JSON.stringify({ error: String(error) }),
    };
  }
};

const errorResponse = (error: any): ApiResponse => {
  if (error instanceof APIError) {
    try {
      return {
        status: error.statusCode,
        body: JSON.stringify({ error: error.message }),
      };
    } catch (error) {
      return {
        status: 500,
        body: JSON.stringify({ error: String(error) }),
      };
    }
  } else {
    return {
      status: 500,
      body: JSON.stringify({ error: String(error) }),
    };
  }
};

interface ApiResponse {
  status: number;
  body: string;
}

export { ApiResponse, successResponse, errorResponse };
