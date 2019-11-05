import * as moment from 'moment'
import * as Async from 'async'
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { Presence } from './presence.entity';
import { Repository } from 'typeorm';
import { PresenceDTO } from './presence.dto';
import { User } from 'src/user/user.entity';
import { PresenceType } from 'src/presence-type/presence-type.entity';

@Injectable()
export class PresenceService {
  constructor(
    @InjectRepository(Presence)
    private readonly repository: Repository<Presence>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(PresenceType)
    private readonly presenceTypeRepository: Repository<PresenceType>
  ) { }

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

  async getAll(options: IPaginationOptions, params: any) {
    let query = this.userRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.presences', 'presences')
      .leftJoinAndSelect('user.departement', 'departement')
      .leftJoinAndSelect('presences.type', 'type')
      .select([
        'user.id',
        'user.nik',
        'user.name',
        'presences.id',
        'presences.createdAt',
        'departement.id',
        'departement.name',
        'type.id',
        'type.name'
      ])

    if (params.attended && params.typeId === 0) {
      query = query.where(`user.id IN (SELECT userId FROM presence WHERE createdAt BETWEEN '${params.startDate}' AND '${params.endDate}')`)
    } else if (params.attended && params.typeId !== 0) {
      query = query.where(`user.id IN (SELECT userId FROM presence WHERE typeId = ${params.typeId as Number} AND createdAt BETWEEN '${params.startDate}' AND '${params.endDate}')`)
    } else if (!params.attended && params.typeId === 0) {
      query = query.where(`user.id NOT IN (SELECT userId FROM presence WHERE createdAt BETWEEN '${params.startDate}' AND '${params.endDate}')`)
    } else {
      query = query.where(`user.id IN (SELECT userId FROM presence WHERE typeId NOT IN (${params.typeId.join(',') as Number}) AND createdAt BETWEEN '${params.startDate}' AND '${params.endDate}')`)
    }

    console.log(query.getQuery())

    return paginate(query, options)
  }

  // getAll(options: IPaginationOptions, params: any) {
  //   const queryBuilder = this.repository.createQueryBuilder('presence')
  //     .where(`presence.createdAt BETWEEN '${params.startDate}' AND '${params.endDate}'`)
  //     .leftJoinAndSelect('presence.user', 'user')
  //     .leftJoinAndSelect('presence.type', 'type')
  //     .leftJoinAndSelect('user.departement', 'departement')
  //     .select([
  //       'presence.id',
  //       'presence.createdAt',
  //       'user.id',
  //       'user.nik',
  //       'user.name',
  //       'type.id',
  //       'type.name',
  //       'departement.name'
  //     ])
  //   return paginate(queryBuilder, options);
  // }

  // async getAllNotAttended(options: IPaginationOptions, params: any) {
  //   const types = await this.presenceTypeRepository.query(`SELECT id, name FROM presence_type WHERE id NOT IN (${params.typeId})`)
  //   let typeIds = ['0']
  //   if (types.length > 0) {
  //     typeIds = await Async.map(types, (item: any, cb) => {
  //       cb(null, item.id)
  //     })
  //   }

  //   const queryBuilder = this.userRepository.createQueryBuilder('user')
  //     .leftJoinAndSelect('user.departement', 'departement')
  //     .where(`user.id NOT IN (SELECT p.userId FROM presence p WHERE typeId IN (${typeIds.join(',')}) AND p.createdAt BETWEEN '${params.startDate}' AND '${params.endDate}')`)
  //     .select([
  //       'user.id',
  //       'user.nik',
  //       'user.name',
  //       'departement.name'
  //     ])

  //   return {
  //     types,
  //     pagination: await paginate(queryBuilder, options)
  //   }
  // }

  // async getAllNotAttended(options: IPaginationOptions, params: any) {
  //   const query = this.userRepository.createQueryBuilder('user')
  //     .leftJoinAndSelect('user.presences', 'presences')
  //     .where(`presences.createdAt BETWEEN :start AND :end`, {
  //       start: params.startDate,
  //       end: params.endDate
  //     })
  //     .andWhere('presences.typeId NOT IN (:id)', {
  //       id: params.typeId
  //     })
  //     .andWhere(`user.id NOT IN presences.id`)
  //     .select([
  //       'user.id',
  //       'user.nik',
  //       'user.name',
  //       'presences.id',
  //       'presences.createdAt'
  //     ])

  //   return paginate(query, options)
  // }

  update(id: number, data: PresenceDTO) {
    return this.repository.update({ id }, data);
  }

  delete(id: number) {
    return this.repository.delete({ id });
  }
}
