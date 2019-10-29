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
