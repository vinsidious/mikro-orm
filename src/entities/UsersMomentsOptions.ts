import {
    Entity,
    ManyToOne,
    OptionalProps,
    PrimaryKeyProp,
    Property,
} from '@mikro-orm/core'

import { MomentOptions } from './MomentOptions'
import { Users } from './Users'

@Entity()
export class UsersMomentsOptions {
    [PrimaryKeyProp]?: ['user', 'momentOption'];
    [OptionalProps]?: 'createdAt'

    @ManyToOne({ primary: true })
    user!: Users

    @ManyToOne({ primary: true })
    momentOption!: MomentOptions

    @Property()
    createdAt = new Date()
}
