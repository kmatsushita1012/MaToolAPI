import IDistrictRepository from "../../../domain/interface/repository/IDistrictRepository";
import {
  District,
  DistrictForm,
  makeDistrictId,
  Performance,
} from "../../../domain/entities/districts";
import { Errors } from "../../../utils/Errors";
import { UserRole, UserRoleType } from "../../../domain/entities/shared";
import { CognitoUserManager } from "../../../inflastructure/manager";
import { IRegionRepository } from "../../../domain/interface/repository";

export default class PostUsecase {
  constructor(
    private distirctRepository: IDistrictRepository,
    private regionRepository: IRegionRepository,
    private manager: CognitoUserManager
  ) {}
  execute = async (regionId: string, form: DistrictForm, user: UserRole) => {
    if (user.type !== UserRoleType.Region || regionId !== user.id) {
      throw Errors.Unauthorized();
    }
    const region = await this.regionRepository.get(regionId);
    if (!region) {
      throw Errors.NotFound("所属する祭典が見つかりません");
    }
    const districtId = makeDistrictId(form.name, region);
    const conflict = await this.distirctRepository.get(districtId);
    if (conflict) {
      throw Errors.Conflict("この名前はすでに登録されています");
    }
    const cognitoResult = await this.manager.invite(
      districtId,
      form.email,
      UserRoleType.District
    );
    if (!cognitoResult) {
      throw Errors.InternalServerError(
        "登録中に原因不明なエラーが発生しました。管理者にお問い合わせください。"
      );
    }
    const district: District = {
      id: districtId,
      name: form.name,
      regionId: regionId,
      description: null,
      base: null,
      area: [],
      imagePath: null,
      performances: [] as Performance[],
      visibility: "admin",
    };
    try {
      await this.distirctRepository.post(district);
    } catch (error) {
      console.log(error);
      throw Errors.InternalServerError(
        "登録中に原因不明なエラーが発生しました。管理者にお問い合わせください。"
      );
    }
    return "Success";
  };
}
