import Location from "./Location";

interface ExpirableLocation extends Location {
  expirationTime: number;
}

export default ExpirableLocation;
