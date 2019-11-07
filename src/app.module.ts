import * as config from 'config'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserRoleModule } from './user-role/user-role.module'
import { UserModule } from './user/user.module'
import { PresenceModule } from './presence/presence.module'
import { Connection } from 'typeorm'
import { PresenceTypeModule } from './presence-type/presence-type.module'
import { AuthModule } from './auth/auth.module'
import { DepartementModule } from './departement/departement.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...config.get('database')
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    UserRoleModule,
    DepartementModule,
    UserModule,
    PresenceTypeModule,
    PresenceModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  constructor(private readonly connection: Connection) { }
}
