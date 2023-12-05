import { Entity, ManyToOne, PrimaryKeyProp, Property } from '@mikro-orm/core'

import { Cities } from './Cities'
import { Users } from './Users'

@Entity()
export class UsersPreviousCities {
    [PrimaryKeyProp]?: ['user', 'city']

    @ManyToOne({ primary: true })
    user!: Users

    @ManyToOne({ primary: true })
    city!: Cities

    @Property()
    leftAt?: Date
}
