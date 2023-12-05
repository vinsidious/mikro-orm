import { v4 as uuidv4 } from 'uuid'

import { Entity, ManyToOne, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core'

import { CardTypes } from './CardTypes'
import { Users } from './Users'

@Entity()
export class Cards {
    [OptionalProps]?: 'id' | 'createdAt' | 'updatedAt' | 'isPermanent'

    @PrimaryKey({ columnType: 'UUID' })
    id = uuidv4()

    @Property()
    context?: string

    @Property()
    destination?: string

    @ManyToOne()
    friend?: Users

    @Property()
    questions?: any

    @ManyToOne()
    cardType?: CardTypes

    @Property({ default: false })
    isPermanent = false

    @Property()
    cardBody?: string

    @Property()
    cardTitle?: string

    @Property()
    color?: string

    @Property()
    cta?: string

    @Property()
    icon?: string

    @Property()
    createdAt = new Date()

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date()
}
