import { IsDefined, IsNumber, IsOptional } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';

const { CREATE, UPDATE } = CrudValidationGroups;

export class PresenceDTO {
  @IsNumber()
  @IsDefined({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  userId: number;

  @IsNumber()
  @IsDefined({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  typeId: number;
}
