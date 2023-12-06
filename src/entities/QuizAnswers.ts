import { v4 as uuidv4 } from 'uuid'

import { Entity, ManyToOne, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core'

import { Attributes } from './Attributes'
import { Quizzes } from './Quizzes'

@Entity()
export class QuizAnswers {
    [OptionalProps]?: 'createdAt' | 'updatedAt' | 'id'

    @PrimaryKey({ columnType: 'UUID' })
    id = uuidv4()

    @ManyToOne()
    quiz?: Quizzes

    @ManyToOne()
    attribute?: Attributes

    @Property()
    cumulativeScore: number

    @Property()
    lastAnsweredAt?: Date

    @Property()
    createdAt = new Date()

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date()
}
