import {
  IsString,
  Length,
  IsDefined,
  IsOptional,
  IsJSON,
  IsNumber,
} from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';

const { CREATE, UPDATE } = CrudValidationGroups;

export class UserDTO {
  @IsDefined({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  roleId: number;

  @IsDefined({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  nik: number;

  @Length(2, 150)
  @IsDefined({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  name: string;

  @Length(2, 120)
  @IsDefined({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  improvement: string;

  @IsDefined({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  picture?: any;
}
