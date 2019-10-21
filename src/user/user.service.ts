import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  create(data: UserDTO) {
    const user = this.repository.create(data);
    return this.repository.save(user);
  }

  findOne(id: number) {
    return this.repository.findOne(id, {
      relations: ['role'],
    });
  }

  getAll(options: IPaginationOptions) {
    const queryBuilder = this.repository.createQueryBuilder('role');
    return paginate(queryBuilder, options);
  }

  update(id: number, data: UserDTO) {
    return this.repository.update({ id }, data);
  }

  delete(id: number) {
    return this.repository.delete({ id });
  }
}
