import { Entity, ManyToOne, PrimaryKeyProp, Property } from '@mikro-orm/core'

import { MomentOptions } from './MomentOptions'
import { Users } from './Users'

@Entity()
export class UsersMoments {
    [PrimaryKeyProp]?: ['user', 'moment']

    @ManyToOne({ primary: true })
    user!: Users

    @ManyToOne({ primary: true })
    moment!: MomentOptions

    @Property()
    moreInformation?: any

    @Property()
    createdAt = new Date()

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date()
}
