import { v4 as uuidv4 } from 'uuid'

import {
    Collection,
    Entity,
    ManyToMany,
    ManyToOne,
    OptionalProps,
    PrimaryKey,
    Property,
} from '@mikro-orm/core'

import { CardTypes } from './CardTypes'
import { Users } from './Users'

@Entity()
export class Cards {
    [OptionalProps]?: 'id' | 'createdAt' | 'updatedAt' | 'isPermanent'

    @PrimaryKey({ columnType: 'UUID' })
    id = uuidv4()

    @Property()
    context?: any

    @Property()
    destination?: string

    @ManyToOne()
    subject?: Users

    @Property()
    questions?: any

    @ManyToOne()
    cardType?: CardTypes

    @ManyToMany(() => Users, 'activeCards')
    viewers = new Collection<Users>(this)

    @Property()
    createdAt = new Date()

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date()
}
