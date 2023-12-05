import { v4 as uuidv4 } from 'uuid'

import { Entity, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core'

@Entity()
export class Attributes {
    [OptionalProps]?: 'id' | 'createdAt' | 'updatedAt'

    @PrimaryKey({ columnType: 'UUID' })
    id = uuidv4()

    @Property()
    attributeName: string

    @Property()
    category: string

    @Property()
    emojiIcon: string

    @Property()
    questionName: string

    @Property()
    shortName: string

    @Property()
    attributeType: string

    @Property()
    createdAt = new Date()

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date()
}
