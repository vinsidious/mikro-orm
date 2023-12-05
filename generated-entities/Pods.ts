import { Entity, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Pods {

  [OptionalProps]?: 'id';

  @PrimaryKey({ columnType: 'uuid', defaultRaw: `uuid_generate_v4()` })
  id!: string;

  @Property({ nullable: true })
  emojiIcon?: string;

  @Property()
  podName!: string;

  @Property({ length: 6, nullable: true, defaultRaw: `now()` })
  createdAt?: Date;

  @Property({ length: 6, nullable: true, defaultRaw: `now()` })
  updatedAt?: Date;

}
