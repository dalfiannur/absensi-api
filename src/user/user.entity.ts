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
import { Departement } from 'src/departement/departement.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint'
  })
  id: number

  @Column()
  roleId: number

  @Column()
  departementId: number

  @Column({
    unique: true
  })
  nik: string

  @Column()
  name: string

  @Column({
    nullable: true,
    unique: true
  })
  username: string

  @Column({
    nullable: true
  })
  password: string

  @Column({
    nullable: true
  })
  improvement: string

  @Column({
    nullable: true
  })
  picture: string

  @Column({
    nullable: true
  })
  country: string

  @Column({
    default: false
  })
  active: boolean

  @ManyToOne(type => UserRole, role => role.users)
  role: UserRole

  @ManyToOne(type => Departement, departement => departement.users)
  departement: Departement

  @OneToMany(type => Presence, presence => presence.user, {
    cascade: true
  })
  presences: Presence[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
