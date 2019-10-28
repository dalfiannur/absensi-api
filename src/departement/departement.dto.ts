import { IsDefined, IsOptional, IsString } from 'class-validator'
import { CrudValidationGroups } from '@nestjsx/crud'

const { CREATE, UPDATE } = CrudValidationGroups

export class DepartementDTO {
  @IsString()
  @IsDefined({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  code: string

  @IsString()
  @IsDefined({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  name: string
}
