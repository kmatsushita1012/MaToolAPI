import { UserRoleType } from "./UserRole"; // UserRoleTypeをインポート

declare global {
  namespace Express {
    export interface Request {
      user?: {
        // user プロパティを追加
        type: UserRoleType;
        id?: string;
      };
    }
  }
}
