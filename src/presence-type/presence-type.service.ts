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
  ) {}

  create(data: PresenceTypeDTO) {
    const type = this.repository.create(data)
    return this.repository.save(type)
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
    return this.repository.update({ id }, data)
  }

  delete(id: number) {
    return this.repository.delete({ id })
  }
}
