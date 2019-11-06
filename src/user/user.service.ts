import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { paginate, IPaginationOptions } from 'nestjs-typeorm-paginate'
import { User } from './user.entity'
import { Repository } from 'typeorm'
import { UserDTO } from './user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) { }

  create(data: UserDTO) {
    const user = this.repository.create(data)
    return this.repository.save(user)
  }

  findById(id: number) {
    return this.repository.findOne(id, {
      relations: ['role', 'departement']
    })
  }

  findByUsername(username: string) {
    return this.repository.findOne({ username })
  }

  findByNIK(nik: number) {
    return this.repository.findOne({
      where: { nik },
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          role: 'user.role',
          departement: 'user.departement'
        }
      }
    })
  }

  getAll(options: IPaginationOptions) {
    const queryBuilder = this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('user.departement', 'departement')
      .select([
        'user.id',
        'user.nik',
        'user.name',
        'user.improvement',
        'user.country',
        'user.picture',
        'user.createdAt',
        'role.id',
        'role.name',
        'departement.name'
      ])

    return paginate(queryBuilder, options)
  }

  update(id: number, data: UserDTO) {
    return this.repository.update({ id }, data)
  }

  delete(id: number) {
    return this.repository.delete({ id })
  }

  async import(users: UserDTO[]) {
    const data = await this.repository
      .createQueryBuilder('user')
      .insert()
      .values(users)

    const [sql, args] = data.getQueryAndParameters()
    const newSql = sql.replace('INSERT INTO', 'INSERT IGNORE INTO')
    return this.repository.query(newSql, args)
  }
}
