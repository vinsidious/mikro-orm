import { Entity, ManyToOne, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';
import { Attributes } from './Attributes';
import { Quizzes } from './Quizzes';

@Entity()
export class QuizAnswers {

  [OptionalProps]?: 'id';

  @PrimaryKey({ columnType: 'uuid', defaultRaw: `uuid_generate_v4()` })
  id!: string;

  @ManyToOne({ entity: () => Quizzes, nullable: true })
  quiz?: Quizzes;

  @ManyToOne({ entity: () => Attributes, nullable: true })
  attribute?: Attributes;

  @Property({ nullable: true })
  answer?: string;

  @Property({ length: 6, nullable: true, defaultRaw: `now()` })
  createdAt?: Date;

  @Property({ length: 6, nullable: true, defaultRaw: `now()` })
  updatedAt?: Date;

}
