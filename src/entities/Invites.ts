import { Users } from 'generated-entities/Users'
import { v4 as uuidv4 } from 'uuid'

import { Entity, ManyToOne, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core'

@Entity()
export class Invites {
    [OptionalProps]?: 'createdAt' | 'updatedAt'

    @PrimaryKey({ columnType: 'UUID' })
    id = uuidv4()

    @ManyToOne()
    inviter?: Users

    @ManyToOne()
    consumer?: Users

    @Property()
    createdAt = new Date()

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date()
}
