import { Entity, ManyToOne, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { Pods } from './Pods';
import { Users } from './Users';

@Entity()
export class UsersPods {

  [PrimaryKeyProp]?: ['userA', 'userB', 'pod'];

  @ManyToOne({ entity: () => Users, primary: true })
  userA!: Users;

  @ManyToOne({ entity: () => Users, primary: true })
  userB!: Users;

  @ManyToOne({ entity: () => Pods, primary: true })
  pod!: Pods;

  @Property({ length: 6, nullable: true, defaultRaw: `now()` })
  createdAt?: Date;

}
