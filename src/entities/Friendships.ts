import {
    Entity,
    ManyToOne,
    OptionalProps,
    PrimaryKeyProp,
    Property,
} from '@mikro-orm/core'

import { Users } from './Users'

@Entity()
export class Friendships {
    [PrimaryKeyProp]?: ['user', 'friend'];
    [OptionalProps]?: 'createdAt' | 'updatedAt'

    @ManyToOne({ primary: true })
    user!: Users

    @ManyToOne({ primary: true, eager: true })
    friend!: Users

    @Property()
    friendsSince: Date

    @Property()
    lastCaughtUp?: Date

    @Property()
    profileUnlockedOn?: Date

    @Property()
    createdAt = new Date()

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date()
}
