import { Entity, ManyToOne, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';
import { Cards } from './Cards';
import { Users } from './Users';

@Entity()
export class Quizzes {

  [OptionalProps]?: 'id';

  @PrimaryKey({ columnType: 'uuid', defaultRaw: `uuid_generate_v4()` })
  id!: string;

  @ManyToOne({ entity: () => Users, nullable: true })
  actor?: Users;

  @ManyToOne({ entity: () => Users, nullable: true })
  subject?: Users;

  @ManyToOne({ entity: () => Cards, nullable: true })
  currentQuizCard?: Cards;

  @Property({ length: 6, nullable: true })
  lastActorQuizAt?: Date;

  @Property({ length: 6, nullable: true, defaultRaw: `now()` })
  createdAt?: Date;

  @Property({ length: 6, nullable: true, defaultRaw: `now()` })
  updatedAt?: Date;

}
