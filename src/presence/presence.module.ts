import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Presence } from './presence.entity';
import { PresenceController } from './presence.controller';
import { PresenceService } from './presence.service';
import { User } from 'src/user/user.entity';
import { PresenceType } from 'src/presence-type/presence-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Presence, PresenceType, User])],
  controllers: [PresenceController],
  providers: [PresenceService],
  exports: [PresenceService]
})
export class PresenceModule {}
