import {
  CognitoIdentityProviderClient,
  GetUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { Request, Response, NextFunction } from "express";
import { UserRole, UserRoleType } from "../domain/entities/shared";
const cognitoClient = new CognitoIdentityProviderClient({
  region: "ap-northeast-1",
});

export const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(req.headers.authorization?.split(" "));
  if (!token) {
    console.log("No Token");
    req.user = { type: UserRoleType.Guest };
    return next();
  }
  console.log("Token");

  try {
    const command = new GetUserCommand({ AccessToken: token });
    const response = await cognitoClient.send(command);

    const attributes = response.UserAttributes ?? [];

    const role = attributes.find((attr) => attr.Name === "custom:role")?.Value;
    const username = response.Username;

    if (
      (role === UserRoleType.Region || role === UserRoleType.District) &&
      username
    ) {
      req.user = { type: role as UserRoleType, id: username };
    } else {
      req.user = { type: UserRoleType.Guest };
    }
    logUserRole(req.user);
  } catch (error) {
    console.error("Cognito認証失敗:", error);
    req.user = { type: UserRoleType.Guest };
  }
  next();
};

export const logUserRole = (role: UserRole): void => {
  console.log("UserRole:", JSON.stringify(role, null, 2));
};
