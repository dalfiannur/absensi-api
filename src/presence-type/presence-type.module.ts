import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PresenceType } from './presence-type.entity'
import { PresenceTypeController } from './presence-type.controller'
import { PresenceTypeService } from './presence-type.service'

@Module({
  imports: [TypeOrmModule.forFeature([PresenceType])],
  controllers: [PresenceTypeController],
  providers: [PresenceTypeService]
})
export class PresenceTypeModule {}
