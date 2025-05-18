import {
  CognitoIdentityProviderClient,
  AdminCreateUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { UserRoleType } from "../../domain/entities/shared";
import { ICognitoUserManager } from "../../domain/interface/aws_cognito";

class CognitoUserManager extends ICognitoUserManager {
  constructor(
    private client: CognitoIdentityProviderClient,
    private userPoolId: string
  ) {
    super();
  }
  async invite(
    username: string,
    email: string,
    role: UserRoleType
  ): Promise<boolean> {
    const command = new AdminCreateUserCommand({
      UserPoolId: this.userPoolId,
      Username: username,
      UserAttributes: [
        { Name: "email", Value: email },
        { Name: "email_verified", Value: "true" },
        { Name: "custom:role", Value: role },
      ],
      DesiredDeliveryMediums: ["EMAIL"],
      ForceAliasCreation: false,
      //   MessageAction: "SUPPRESS", // ← 招待メールを手動送信したいならSUPPRESS。自動送信したいなら削除
    });

    try {
      const response = await this.client.send(command);
      console.log("User invited:", JSON.stringify(response));
      return true;
    } catch (error) {
      console.error("Error inviting user:", error);
      return false;
    }
  }
}
export { CognitoUserManager };
