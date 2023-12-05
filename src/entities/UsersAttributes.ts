import { Entity, ManyToOne, PrimaryKeyProp, Property } from '@mikro-orm/core'

import { Attributes } from './Attributes'
import { Users } from './Users'

@Entity()
export class UsersAttributes {
    [PrimaryKeyProp]?: ['user', 'attribute']

    @ManyToOne({ primary: true })
    user!: Users

    @ManyToOne({ primary: true })
    attribute!: Attributes

    @Property()
    answer?: string

    @Property()
    createdAt = new Date()

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date()
}
