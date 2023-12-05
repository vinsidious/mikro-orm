import { Entity, ManyToOne, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { Attributes } from './Attributes';
import { Users } from './Users';

@Entity()
export class UsersAttributes {

  [PrimaryKeyProp]?: ['user', 'attribute'];

  @ManyToOne({ entity: () => Users, primary: true })
  user!: Users;

  @ManyToOne({ entity: () => Attributes, primary: true })
  attribute!: Attributes;

  @Property({ nullable: true })
  answer?: string;

  @Property({ length: 6, nullable: true, defaultRaw: `now()` })
  createdAt?: Date;

  @Property({ length: 6, nullable: true, defaultRaw: `now()` })
  updatedAt?: Date;

}
