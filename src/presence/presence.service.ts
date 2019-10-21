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
    const queryBuilder = this.repository.createQueryBuilder('role');
    return paginate(queryBuilder, options);
  }

  update(id: number, data: PresenceDTO) {
    return this.repository.update({ id }, data);
  }

  delete(id: number) {
    return this.repository.delete({ id });
  }
}
