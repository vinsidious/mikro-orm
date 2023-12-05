import { Entity, ManyToOne, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { Cities } from './Cities';
import { Users } from './Users';

@Entity()
export class UsersPreviousMajorCities {

  [PrimaryKeyProp]?: ['user', 'majorCity'];

  @ManyToOne({ entity: () => Users, primary: true })
  user!: Users;

  @ManyToOne({ entity: () => Cities, primary: true })
  majorCity!: Cities;

  @Property({ length: 6, nullable: true })
  leftAt?: Date;

}
