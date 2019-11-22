import { Length, IsDefined, IsOptional } from 'class-validator'
import { CrudValidationGroups } from '@nestjsx/crud'

const { CREATE, UPDATE } = CrudValidationGroups

export class UserDTO {
  @IsDefined({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  roleId?: number

  @IsDefined({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  nik?: string

  @Length(2, 150)
  @IsDefined({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  name?: string

  @Length(2, 150)
  @IsDefined({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  username?: string

  @Length(2, 150)
  @IsDefined({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  password?: string

  @Length(2, 120)
  @IsDefined({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  improvement?: string

  @Length(2, 120)
  @IsDefined({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  country?: string

  @IsDefined({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  picture?: any
}

export class AuthDTO {
  @IsDefined({ groups: [CREATE, UPDATE] })
  username: string

  @IsDefined({ groups: [CREATE, UPDATE] })
  password: string
}
