import { v4 as uuidv4 } from 'uuid'

import { Entity, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core'

@Entity()
export class Pods {
    [OptionalProps]?: 'createdAt' | 'updatedAt' | 'id'

    @PrimaryKey({ columnType: 'UUID' })
    id = uuidv4()

    @Property()
    emojiIcon?: string

    @Property()
    podName: string

    @Property()
    createdAt = new Date()

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date()
}
