import { Entity, ManyToOne, PrimaryKeyProp, Property } from '@mikro-orm/core'

import { Users } from './Users'

@Entity()
export class UsersBlockedUsers {
    [PrimaryKeyProp]?: ['blocker', 'blocked']

    @ManyToOne({ primary: true })
    blocker!: Users

    @ManyToOne({ primary: true })
    blocked!: Users

    @Property()
    createdAt = new Date()
}
