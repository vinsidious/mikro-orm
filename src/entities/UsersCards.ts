import {
    Entity,
    Filter,
    ManyToOne,
    OptionalProps,
    PrimaryKeyProp,
    Property,
} from '@mikro-orm/core'

import { Cards } from './Cards'
import { Users } from './Users'

@Entity()
@Filter({ name: 'active', default: true, cond: { isDismissed: false } })
export class UsersCards {
    [OptionalProps]?: 'isDismissed' | 'createdAt' | 'updatedAt';
    [PrimaryKeyProp]?: ['viewer', 'card']

    @ManyToOne({ primary: true, eager: true })
    viewer!: Users

    @ManyToOne({ primary: true, eager: true })
    card!: Cards

    @Property({ default: false })
    isDismissed = false

    @Property()
    createdAt = new Date()

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date()
}
