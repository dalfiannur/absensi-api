import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne
} from 'typeorm'
import { Presence } from '../presence/presence.entity'
import { UserRole } from '../user-role/user-role.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint'
  })
  id: number

  @Column()
  roleId: number

  @Column({
    type: 'bigint'
  })
  nik: number

  @Column()
  name: string

  @Column({
    nullable: true
  })
  username: string

  @Column({
    nullable: true
  })
  password: string

  @Column()
  improvement: string

  @Column()
  picture: string

  @ManyToOne(type => UserRole, role => role.users)
  role: UserRole

  @OneToMany(type => Presence, presence => presence.user)
  presences: Presence[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
