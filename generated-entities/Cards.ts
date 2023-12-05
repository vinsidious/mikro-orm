import { Entity, ManyToOne, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';
import { CardTypes } from './CardTypes';
import { Users } from './Users';

@Entity()
export class Cards {

  [OptionalProps]?: 'id';

  @PrimaryKey({ columnType: 'uuid', defaultRaw: `uuid_generate_v4()` })
  id!: string;

  @Property({ nullable: true })
  context?: string;

  @Property({ nullable: true })
  destination?: string;

  @ManyToOne({ entity: () => Users, nullable: true })
  friend?: Users;

  @Property({ nullable: true })
  questions?: any;

  @ManyToOne({ entity: () => CardTypes, nullable: true })
  cardType?: CardTypes;

  @Property({ nullable: true, default: false })
  isPermanent?: boolean = false;

  @Property({ nullable: true })
  cardBody?: string;

  @Property({ nullable: true })
  cardTitle?: string;

  @Property({ nullable: true })
  color?: string;

  @Property({ nullable: true })
  cta?: string;

  @Property({ nullable: true })
  icon?: string;

  @Property({ length: 6, nullable: true, defaultRaw: `now()` })
  createdAt?: Date;

  @Property({ length: 6, nullable: true, defaultRaw: `now()` })
  updatedAt?: Date;

}
