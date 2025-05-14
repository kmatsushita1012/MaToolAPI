const Visibility = {
  AdminOnly: "district",
  Partial: "partial",
  Everyone: "public",
} as const;

type Visibility = (typeof Visibility)[keyof typeof Visibility];
