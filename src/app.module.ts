import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserRoleModule } from './user-role/user-role.module'
import { UserModule } from './user/user.module'
import { PresenceModule } from './presence/presence.module'
import { Connection } from 'typeorm'
import * as config from 'config';

@Module({
  imports: [
    TypeOrmModule.forRoot(config.get('database')),
    UserRoleModule,
    UserModule,
    PresenceModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
