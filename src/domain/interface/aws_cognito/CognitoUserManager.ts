import { UserRoleType } from "../../entities/shared";

export default abstract class ICognitoUserManager {
  abstract invite(
    username: string,
    email: string,
    role: UserRoleType
  ): Promise<boolean>;
}
