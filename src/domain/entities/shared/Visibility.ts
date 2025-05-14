const Visibility = {
  AdminOnly: "admin",
  Partial: "route",
  Everyone: "all",
} as const;

type Visibility = (typeof Visibility)[keyof typeof Visibility];
