import { Entity, ManyToOne, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { MomentOptions } from './MomentOptions';
import { Users } from './Users';

@Entity()
export class UsersMomentsOptions {

  [PrimaryKeyProp]?: ['user', 'momentOption'];

  @ManyToOne({ entity: () => Users, primary: true })
  user!: Users;

  @ManyToOne({ entity: () => MomentOptions, primary: true })
  momentOption!: MomentOptions;

  @Property({ length: 6, nullable: true, defaultRaw: `now()` })
  createdAt?: Date;

}
