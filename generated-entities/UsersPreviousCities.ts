import { Entity, ManyToOne, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { Cities } from './Cities';
import { Users } from './Users';

@Entity()
export class UsersPreviousCities {

  [PrimaryKeyProp]?: ['user', 'city'];

  @ManyToOne({ entity: () => Users, primary: true })
  user!: Users;

  @ManyToOne({ entity: () => Cities, primary: true })
  city!: Cities;

  @Property({ length: 6, nullable: true })
  leftAt?: Date;

}
