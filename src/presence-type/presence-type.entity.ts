import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm'
import { Presence } from '../presence/presence.entity'

@Entity()
export class PresenceType {
  @PrimaryGeneratedColumn({
    type: 'bigint'
  })
  id: number

  @Column()
  code: string

  @Column()
  name: string

  @OneToMany(type => Presence, presence => presence.type, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  presences: Presence[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
