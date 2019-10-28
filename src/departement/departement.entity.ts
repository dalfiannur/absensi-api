import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm'
import { User } from 'src/user/user.entity'

@Entity()
export class Departement {
  @PrimaryGeneratedColumn({
    type: 'bigint'
  })
  id: number

  @Column()
  code: string

  @Column()
  name: string

  @OneToMany(type => User, user => user.departement, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  users: User[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
