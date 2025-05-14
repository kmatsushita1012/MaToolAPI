import Location from "./Location";
import ExpirableLocation from "./ExpirableLocation";
import PublicLocation from "./PublicLocation";
import { District } from "../districts";

export { Location, ExpirableLocation, toExpirableLocation, toPublicLocation };

const toExpirableLocation = (
  item: Location,
  expirationTime: number
): ExpirableLocation => {
  return { ...item, expirationTime };
};

const toPublicLocation = (
  location: Location,
  district: District
): PublicLocation => {
  return { ...location, districtName: district.name };
};
