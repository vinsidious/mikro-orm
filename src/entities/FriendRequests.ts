import {
    Entity,
    ManyToOne,
    OptionalProps,
    PrimaryKeyProp,
    Property,
} from '@mikro-orm/core'

import { Users } from './Users'

@Entity()
export class FriendRequests {
    [PrimaryKeyProp]?: ['fromUser', 'toUser'];
    [OptionalProps]?: 'createdAt'

    @ManyToOne({ primary: true })
    fromUser!: Users

    @ManyToOne({ primary: true })
    toUser!: Users

    @Property()
    createdAt = new Date()
}
