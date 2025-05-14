export type UserRole =
  | { type: "region"; id: string }
  | { type: "district"; id: string }
  | { type: "guest" };

export enum UserRoleType {
  Region = "region",
  District = "district",
  Guest = "guest",
}

export const UserRole = {
  Region: (id: string): UserRole => ({ type: UserRoleType.Region, id }),
  District: (id: string): UserRole => ({ type: UserRoleType.District, id }),
  Guest: (): UserRole => ({ type: UserRoleType.Guest }),
};
