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
    [PrimaryKeyProp]?: ['user', 'friend', 'pod']

    @ManyToOne({ primary: true })
    user!: Users

    @ManyToOne({ primary: true })
    friend!: Users

    @ManyToOne({ primary: true })
    pod!: Pods

    @Property()
    createdAt = new Date()
}
