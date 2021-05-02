import {
  Entity, Column, CreateDateColumn, PrimaryColumn, UpdateDateColumn, Unique,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('users')
@Unique(['email'])
export default class User {
  @PrimaryColumn()
  readonly id: string;

  @Column('varchar', {
    name: 'home_team',
    nullable: true,
  })
  homeTeam: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;

  @Column('double precision')
  height: number;

  @Column({ type: 'timestamp' })
  age: Date;

  @CreateDateColumn({ type: 'timestamp', default: 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', onUpdate: 'NOW()' })
  updatedAt: Date;

  constructor() { if (!this.id) this.id = uuid(); }
}