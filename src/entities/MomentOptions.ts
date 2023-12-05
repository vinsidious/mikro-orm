import { v4 as uuidv4 } from 'uuid'

import { Entity, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core'

@Entity()
export class MomentOptions {
    [OptionalProps]?: 'id' | 'createdAt' | 'updatedAt'

    @PrimaryKey({ columnType: 'UUID' })
    id = uuidv4()

    @Property()
    moreInformation?: any

    @Property()
    optionName: string

    @Property()
    createdAt = new Date()

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date()
}
