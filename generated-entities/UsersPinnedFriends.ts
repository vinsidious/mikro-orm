import { Entity, ManyToOne, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { Users } from './Users';

@Entity()
export class UsersPinnedFriends {

  [PrimaryKeyProp]?: ['user', 'pinnedFriend'];

  @ManyToOne({ entity: () => Users, primary: true })
  user!: Users;

  @ManyToOne({ entity: () => Users, primary: true })
  pinnedFriend!: Users;

  @Property({ length: 6, nullable: true, defaultRaw: `now()` })
  createdAt?: Date;

}
