import { Entity, ManyToOne, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { Users } from './Users';

@Entity()
export class Friendships {

  [PrimaryKeyProp]?: ['userA', 'userB'];

  @ManyToOne({ entity: () => Users, primary: true })
  userA!: Users;

  @ManyToOne({ entity: () => Users, primary: true })
  userB!: Users;

  @Property({ length: 6, nullable: true })
  friendsSince?: Date;

  @Property({ length: 6, nullable: true })
  lastCaughtUp?: Date;

  @Property({ length: 6, nullable: true })
  profileUnlockedOn?: Date;

  @Property({ length: 6, nullable: true, defaultRaw: `now()` })
  createdAt?: Date;

  @Property({ length: 6, nullable: true, defaultRaw: `now()` })
  updatedAt?: Date;

}
