import { Entity, ManyToOne, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { Users } from './Users';

@Entity()
export class UsersBlockedUsers {

  [PrimaryKeyProp]?: ['blocker', 'blocked'];

  @ManyToOne({ entity: () => Users, primary: true })
  blocker!: Users;

  @ManyToOne({ entity: () => Users, primary: true })
  blocked!: Users;

  @Property({ length: 6, nullable: true, defaultRaw: `now()` })
  createdAt?: Date;

}
