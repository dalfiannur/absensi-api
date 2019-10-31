import * as moment from 'moment'
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { Presence } from './presence.entity';
import { Repository } from 'typeorm';
import { PresenceDTO } from './presence.dto';

@Injectable()
export class PresenceService {
  constructor(
    @InjectRepository(Presence)
    private readonly repository: Repository<Presence>,
  ) {}

  create(data: PresenceDTO) {
    return this.repository.insert(data);
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  countBetweenDate(startDate: Date, endDate: Date, where?: any) {
    const query = this.repository.createQueryBuilder('presence')
      .where(`presence.createdAt BETWEEN '${startDate.toISOString()}' AND '${endDate.toISOString()}'`)

    if (where.typeId) {
      query.andWhere(`typeId=${where.typeId}`)
    }
      
    return query.getCount()
  }

  async checkByUserIdAndTypeId(userId: number, typeId: number) {
    const startDate = moment()
      .utcOffset(0)
      .set({
        hour: 0,
        minute: 0,
        second: 1
      })
      .toISOString()

    const endDate = moment()
      .utcOffset(0)
      .set({
        hours: 23,
        minutes: 59,
        seconds: 59
      })
      .toISOString()

    const result = await this.repository.createQueryBuilder('presence')
      .where(`presence.createdAt BETWEEN '${startDate}' AND '${endDate}'`)
      .andWhere(`presence.userId = ${userId}`)
      .andWhere(`presence.typeId = ${typeId}`)
      .getOne()

    if (result) return { exist: true }
    return { exist: false }
  }

  getAll(options: IPaginationOptions) {
    const queryBuilder = this.repository.createQueryBuilder('presence')
      .leftJoinAndSelect('presence.user', 'user')
      .leftJoinAndSelect('presence.type', 'type')
      .leftJoinAndSelect('user.departement', 'departement')
      .select([
        'presence.id',
        'presence.createdAt',
        'user.id',
        'user.nik',
        'user.name',
        'type.id',
        'type.name',
        'departement.name'
      ])
    return paginate(queryBuilder, options);
  }

  update(id: number, data: PresenceDTO) {
    return this.repository.update({ id }, data);
  }

  delete(id: number) {
    return this.repository.delete({ id });
  }
}
