import {
  forbiddenResponse,
  unauthorizedResponse,
} from "../../utils/responses";
import { District } from "aws-sdk/clients/taxsettings";

const postDistricts = async (
  district: District,
  userSub: string
): Promise<string> => {
  if (!userSub) {
    return unauthorizedResponse();
  }
  if (district.id !== userSub) {
    return forbiddenResponse();
  }
  return "";
};

export default postDistricts;
