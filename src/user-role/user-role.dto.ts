import { IsString, Length, IsDefined, IsOptional } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';

const { CREATE, UPDATE } = CrudValidationGroups;

export class UserRoleDTO {
  @IsString()
  @Length(2, 120)
  @IsDefined({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  name: string;
}
