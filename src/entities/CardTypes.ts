import { v4 as uuidv4 } from 'uuid'

import { Entity, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core'

@Entity()
export class CardTypes {
    [OptionalProps]?: 'id' | 'color' | 'cta' | 'icon'

    @PrimaryKey({ columnType: 'UUID' })
    id = uuidv4()

    @Property()
    cardBody?: string

    @Property()
    cardTitle?: string

    @Property()
    color?: string

    @Property()
    cta?: string

    @Property()
    icon?: string

    @Property({ default: false })
    isPermanent = false

    @Property()
    createdAt = new Date()

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date()
}
