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
    [PrimaryKeyProp]?: ['userA', 'userB'];
    [OptionalProps]?: 'createdAt' | 'updatedAt'

    @ManyToOne({ primary: true })
    userA!: Users

    @ManyToOne({ primary: true })
    userB!: Users

    @Property()
    friendsSince?: Date

    @Property()
    lastCaughtUp?: Date

    @Property()
    profileUnlockedOn?: Date

    @Property()
    createdAt = new Date()

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date()
}
