import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Cities {

  @PrimaryKey()
  id!: string;

  @Property()
  countryCode!: string;

  @Property({ columnType: 'geometry' })
  location!: unknown;

  @ManyToOne({ entity: () => Cities, nullable: true })
  majorCity?: Cities;

  @Property({ columnType: 'numeric(10,0)', nullable: true })
  population?: string;

  @Property()
  readableName!: string;

  @Property()
  timezone!: string;

  @Property({ length: 6, nullable: true, defaultRaw: `now()` })
  createdAt?: Date;

  @Property({ length: 6, nullable: true, defaultRaw: `now()` })
  updatedAt?: Date;

}
