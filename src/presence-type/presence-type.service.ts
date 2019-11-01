import * as _ from 'lodash'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { paginate, IPaginationOptions } from 'nestjs-typeorm-paginate'
import { PresenceType } from './presence-type.entity'
import { Repository } from 'typeorm'
import { PresenceTypeDTO } from './presence-type.dto'

@Injectable()
export class PresenceTypeService {
  constructor(
    @InjectRepository(PresenceType)
    private readonly repository: Repository<PresenceType>
  ) { }

  async create(data: PresenceTypeDTO) {
    return this.repository.createQueryBuilder('type')
      .insert()
      .values({
        ...data,
        code: _.kebabCase(data.name)
      })
      .execute()
     
  }

  findById(id: number) {
    return this.repository.findOne(id)
  }

  findByCode(code: string) {
    return this.repository.findOne({
      code
    })
  }

  getAll(options: IPaginationOptions) {
    const queryBuilder = this.repository.createQueryBuilder('presenceType')
    return paginate(queryBuilder, options)
  }

  update(id: number, data: PresenceTypeDTO) {
    return this.repository.createQueryBuilder('type')
      .update()
      .set({
        ...data,
        code: _.kebabCase(data.name)
      })
      .where(`id = ${id}`)
      .execute()
  }

  delete(id: number) {
    return this.repository.delete({ id })
  }
}
