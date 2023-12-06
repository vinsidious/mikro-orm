import { v4 as uuidv4 } from 'uuid'

import { Entity, ManyToOne, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core'

import { Users } from './Users'

@Entity()
export class Invites {
    [OptionalProps]?: 'createdAt' | 'updatedAt'

    @PrimaryKey()
    id: string

    @ManyToOne()
    inviter?: Users

    @ManyToOne()
    consumer?: Users

    @Property()
    createdAt = new Date()

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date()
}
