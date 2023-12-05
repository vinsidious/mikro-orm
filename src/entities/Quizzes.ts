import { v4 as uuidv4 } from 'uuid'

import { Entity, ManyToOne, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core'

import { Cards } from './Cards'
import { Users } from './Users'

@Entity()
export class Quizzes {
    [OptionalProps]?: 'createdAt' | 'updatedAt' | 'id'

    @PrimaryKey({ columnType: 'UUID' })
    id = uuidv4()

    @ManyToOne()
    actor?: Users

    @ManyToOne()
    subject?: Users

    @ManyToOne()
    currentQuizCard?: Cards

    @Property()
    lastActorQuizAt?: Date

    @Property()
    createdAt = new Date()

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date()
}
