import { Entity, ManyToOne, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';
import { Users } from './Users';

@Entity()
export class Popups {

  [OptionalProps]?: 'id';

  @PrimaryKey({ columnType: 'uuid', defaultRaw: `uuid_generate_v4()` })
  id!: string;

  @ManyToOne({ entity: () => Users })
  user!: Users;

  @Property()
  popupName!: string;

  @Property()
  popupType!: string;

  @Property({ length: 6 })
  startedAt!: Date;

  @Property({ length: 6, nullable: true })
  endedEarlyAt?: Date;

  @Property({ length: 6 })
  expiredAt!: Date;

  @Property({ length: 6, nullable: true, defaultRaw: `now()` })
  createdAt?: Date;

  @Property({ length: 6, nullable: true, defaultRaw: `now()` })
  updatedAt?: Date;

}
