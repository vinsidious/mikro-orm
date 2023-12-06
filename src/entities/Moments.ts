import { v4 as uuidv4 } from 'uuid'

import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core'

import { MomentOptions } from './MomentOptions'
import { Users } from './Users'

@Entity()
export class Moments {
    @PrimaryKey({ columnType: 'UUID' })
    id = uuidv4()

    @ManyToOne()
    user?: Users

    @ManyToOne()
    momentOption?: MomentOptions

    @Property()
    moreInformation?: any

    @Property()
    createdAt = new Date()

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date()
}
