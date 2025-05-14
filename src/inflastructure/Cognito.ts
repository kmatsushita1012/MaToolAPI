import {
  CognitoIdentityProviderClient,
  GetUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { Request, Response, NextFunction } from "express";
import { UserRoleType } from "../domain/entities/shared";
const cognitoClient = new CognitoIdentityProviderClient({
  region: "ap-northeast-1",
});

export const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    req.user = { type: UserRoleType.Guest };
    return next();
  }

  try {
    const command = new GetUserCommand({ AccessToken: token });
    const response = await cognitoClient.send(command);

    const attributes = response.UserAttributes ?? [];

    const role = attributes.find((attr) => attr.Name === "custom:role")?.Value;
    const sub = attributes.find((attr) => attr.Name === "sub")?.Value;

    if (
      (role === UserRoleType.Region || role === UserRoleType.District) &&
      sub
    ) {
      req.user = { type: role as UserRoleType, id: sub };
    } else {
      req.user = { type: UserRoleType.Guest };
    }
  } catch (error) {
    console.error("Cognito認証失敗:", error);
    req.user = { type: UserRoleType.Guest };
  }
  next();
};
