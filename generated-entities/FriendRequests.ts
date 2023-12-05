import { Entity, ManyToOne, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { Users } from './Users';

@Entity()
export class FriendRequests {

  [PrimaryKeyProp]?: ['fromUser', 'toUser'];

  @ManyToOne({ entity: () => Users, primary: true })
  fromUser!: Users;

  @ManyToOne({ entity: () => Users, primary: true })
  toUser!: Users;

  @Property({ length: 6, nullable: true, defaultRaw: `now()` })
  createdAt?: Date;

}
