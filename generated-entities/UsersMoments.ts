import { Entity, ManyToOne, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { MomentOptions } from './MomentOptions';
import { Users } from './Users';

@Entity()
export class UsersMoments {

  [PrimaryKeyProp]?: ['user', 'moment'];

  @ManyToOne({ entity: () => Users, primary: true })
  user!: Users;

  @ManyToOne({ entity: () => MomentOptions, primary: true })
  moment!: MomentOptions;

  @Property({ length: 6, nullable: true, defaultRaw: `now()` })
  createdAt?: Date;

  @Property({ length: 6, nullable: true, defaultRaw: `now()` })
  updatedAt?: Date;

  @Property({ nullable: true })
  moreInformation?: any;

}
