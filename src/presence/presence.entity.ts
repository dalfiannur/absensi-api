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
  status: boolean

  @ManyToOne(type => User, user => user.presences, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  user: User

  @ManyToOne(type => PresenceType, type => type.presences)
  type: PresenceType

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
