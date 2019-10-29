import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm'
import { User } from '../user/user.entity'
import { PresenceType } from '../presence-type/presence-type.entity'

@Entity()
export class Presence {
  @PrimaryGeneratedColumn({
    type: 'bigint'
  })
  id: number

  @Column()
  userId: number

  @Column()
  typeId: number

  @ManyToOne(type => User, user => user.presences)
  user: User

  @ManyToOne(type => PresenceType, type => type.presences)
  type: PresenceType

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
