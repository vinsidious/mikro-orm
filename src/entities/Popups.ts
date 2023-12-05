import { v4 as uuidv4 } from 'uuid'

import { Entity, ManyToOne, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core'

import { Users } from './Users'

@Entity()
export class Popups {
    [OptionalProps]?: 'id' | 'endedEarlyAt' | 'createdAt' | 'updatedAt'

    @PrimaryKey({ columnType: 'UUID' })
    id = uuidv4()

    @ManyToOne()
    user!: Users

    @Property()
    popupName!: string

    @Property()
    popupType!: string

    @Property()
    startedAt!: Date

    @Property()
    endedEarlyAt?: Date

    @Property()
    expiredAt!: Date

    @Property()
    createdAt = new Date()

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date()
}
