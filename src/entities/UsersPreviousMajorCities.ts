import { Entity, ManyToOne, PrimaryKeyProp, Property } from '@mikro-orm/core'

import { Cities } from './Cities'
import { Users } from './Users'

@Entity()
export class UsersPreviousMajorCities {
    [PrimaryKeyProp]?: ['user', 'majorCity']

    @ManyToOne({ primary: true })
    user!: Users

    @ManyToOne({ primary: true })
    majorCity!: Cities

    @Property()
    leftAt?: Date
}
