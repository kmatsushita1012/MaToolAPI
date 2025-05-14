export const Visibility = {
  AdminOnly: "admin",
  Partial: "route",
  Everyone: "all",
} as const;

export type Visibility = (typeof Visibility)[keyof typeof Visibility];
