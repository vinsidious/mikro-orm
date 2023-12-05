import {
    Entity,
    ManyToOne,
    OptionalProps,
    PrimaryKeyProp,
    Property,
} from '@mikro-orm/core'

import { Pods } from './Pods'
import { Users } from './Users'

@Entity()
export class UsersPods {
    [OptionalProps]?: 'createdAt';
    [PrimaryKeyProp]?: ['userA', 'userB', 'pod']

    @ManyToOne({ primary: true })
    userA!: Users

    @ManyToOne({ primary: true })
    userB!: Users

    @ManyToOne({ primary: true })
    pod!: Pods

    @Property()
    createdAt = new Date()
}
