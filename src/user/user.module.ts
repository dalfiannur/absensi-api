import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user.entity'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { DepartementModule } from 'src/departement/departement.module'

@Module({
  imports: [TypeOrmModule.forFeature([User]), DepartementModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
