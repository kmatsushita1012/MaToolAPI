import { forbiddenResponse, unauthorizedResponse } from "../../utils/responses";
import { Location } from "../../domain/models/location";
import { SimpleDate, SimpleTime } from "../../domain/models/share";

const postLocations = async (
  location: Location,
  userSub: string
): Promise<string> => {
  if (!userSub) {
    throw new Error();
  }
  if (location.districtId !== userSub) {
    throw new Error();
  }
  //変換
  const expirationTime = calculateExpirationTime(location.date, location.time);

  return "";
};

export default postLocations;

const calculateExpirationTime = (date: SimpleDate, time: SimpleTime) => {
  const isoString = `${date.year}-${date.month}-${date.day}T${time.hour}:${
    time.minute
  }:${0}Z`;
  const fullDate = new Date(isoString);
  const expirationDate = new Date(fullDate.getTime() + 3 * 60 * 60 * 1000);
  return Math.floor(expirationDate.getTime() / 1000);
};
