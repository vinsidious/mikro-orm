import { Point } from 'geojson'
import { v4 as uuidv4 } from 'uuid'

import { Entity, ManyToOne, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core'

@Entity()
export class Cities {
    [OptionalProps]?: 'createdAt' | 'updatedAt' | 'id'

    @PrimaryKey({ columnType: 'UUID' })
    id = uuidv4()

    @Property()
    countryCode: string

    @Property()
    location: Point

    @ManyToOne()
    majorCity?: Cities

    @Property()
    population: number

    @Property()
    readableName: string

    @Property()
    timezone: string

    @Property()
    createdAt = new Date()

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date()
}
