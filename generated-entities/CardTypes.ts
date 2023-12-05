import { Entity, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class CardTypes {

  [OptionalProps]?: 'id';

  @PrimaryKey({ columnType: 'uuid', defaultRaw: `uuid_generate_v4()` })
  id!: string;

  @Property()
  cardBody!: string;

  @Property()
  cardTitle!: string;

  @Property({ nullable: true })
  color?: string;

  @Property({ nullable: true })
  cta?: string;

  @Property({ nullable: true })
  icon?: string;

  @Property({ nullable: true, default: false })
  isPermanent?: boolean = false;

  @Property({ length: 6, nullable: true, defaultRaw: `now()` })
  createdAt?: Date;

  @Property({ length: 6, nullable: true, defaultRaw: `now()` })
  updatedAt?: Date;

}
