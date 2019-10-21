import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { UserRole } from './user-role.entity';
import { Repository } from 'typeorm';
import { UserRoleDTO } from './user-role.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private readonly repository: Repository<UserRole>,
  ) {}

  create(data: UserRoleDTO) {
    return this.repository.insert(data);
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  getAll(options: IPaginationOptions) {
    const queryBuilder = this.repository.createQueryBuilder('role');
    return paginate<UserRole>(queryBuilder, options);
  }

  update(id: number, data: UserRoleDTO) {
    return this.repository.update({ id }, data);
  }

  delete(id: number) {
    return this.repository.delete({ id });
  }
}
