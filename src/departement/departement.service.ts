import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { paginate, IPaginationOptions } from 'nestjs-typeorm-paginate'
import { Departement } from './departement.entity'
import { Repository } from 'typeorm'
import { DepartementDTO } from './departement.dto'

@Injectable()
export class DepartementService {
  constructor(
    @InjectRepository(Departement)
    private readonly repository: Repository<Departement>
  ) {}

  create(data: DepartementDTO) {
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
    const queryBuilder = this.repository.createQueryBuilder('departement')
    return paginate(queryBuilder, options)
  }

  update(id: number, data: DepartementDTO) {
    return this.repository.update({ id }, data)
  }

  delete(id: number) {
    return this.repository.delete({ id })
  }
}
