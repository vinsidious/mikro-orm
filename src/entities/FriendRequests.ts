import {
    Entity,
    ManyToOne,
    OptionalProps,
    PrimaryKeyProp,
    Property,
} from '@mikro-orm/core'

import { Users } from './Users'

export enum FriendRequestStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
}
@Entity()
export class FriendRequests {
    [PrimaryKeyProp]?: ['fromUser', 'toUser'];
    [OptionalProps]?: 'createdAt'

    @Property({ default: 'PENDING' })
    status = FriendRequestStatus.PENDING

    @ManyToOne({ primary: true })
    fromUser!: Users

    @ManyToOne({ primary: true })
    toUser!: Users

    @Property()
    createdAt = new Date()

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date()
}
