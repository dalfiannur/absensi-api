import { IsDefined, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';

const { CREATE, UPDATE } = CrudValidationGroups;

export class PresenceDTO {
  @IsNumber()
  @IsDefined({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  userId: number;

  @IsBoolean()
  @IsDefined({ groups: [CREATE, UPDATE] })
  @IsOptional({ groups: [UPDATE] })
  status: boolean;
}
