import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Users } from './Users';

@Entity()
export class Invites {

  @PrimaryKey()
  id!: string;

  @ManyToOne({ entity: () => Users, nullable: true })
  inviter?: Users;

  @ManyToOne({ entity: () => Users, nullable: true })
  consumer?: Users;

  @Property({ length: 6, nullable: true, defaultRaw: `now()` })
  createdAt?: Date;

  @Property({ length: 6, nullable: true, defaultRaw: `now()` })
  updatedAt?: Date;

}
