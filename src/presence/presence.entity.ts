import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm'
import { User } from '../user/user.entity'

@Entity()
export class Presence {
  @PrimaryGeneratedColumn({
    type: 'bigint'
  })
  id: number

  @ManyToOne(type => User, user => user.presences, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  user: User

  @Column()
  status: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
