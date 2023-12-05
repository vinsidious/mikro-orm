import {
    Entity,
    ManyToOne,
    OptionalProps,
    PrimaryKeyProp,
    Property,
} from '@mikro-orm/core'

import { Users } from './Users'

@Entity()
export class UsersPinnedFriends {
    [OptionalProps]?: 'createdAt';
    [PrimaryKeyProp]?: ['user', 'pinnedFriend']

    @ManyToOne({ primary: true })
    user!: Users

    @ManyToOne({ primary: true })
    pinnedFriend!: Users

    @Property()
    createdAt = new Date()
}
