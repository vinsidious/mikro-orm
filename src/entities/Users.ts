import { v4 as uuidv4 } from 'uuid'

import {
    Collection,
    DateType,
    Entity,
    ManyToMany,
    ManyToOne,
    OptionalProps,
    PrimaryKey,
    Property,
    Unique,
} from '@mikro-orm/core'

import { Cards } from './Cards'
import { Cities } from './Cities'

@Entity()
export class Users {
    [OptionalProps]?: 'id' | 'countAttribute' | 'countQuiz' | 'isFullUser'

    @PrimaryKey({ columnType: 'UUID' })
    id = uuidv4()

    @Property({ defaultRaw: `0` })
    countAttribute = 0

    @Property({ defaultRaw: `0` })
    countQuiz = 0

    @Property()
    countryCode?: string

    @ManyToOne()
    currentCity?: Cities

    @ManyToOne()
    currentMajorCity?: Cities

    @Property({ type: DateType })
    dateOfBirth?: Date

    @Property()
    expoPushToken?: string

    @Property()
    firstName?: string

    @ManyToOne()
    homeBaseCity?: Cities

    @ManyToOne()
    homeBaseMajorCity?: Cities

    @Property()
    lastName?: string

    @Unique({ name: 'users_phone_number_key' })
    @Property()
    phoneNumber?: string

    @Property()
    profilePictureKey?: string

    @Property()
    socials?: any

    @Property({ default: false })
    isFullUser = false

    @Unique({ name: 'users_username_key' })
    @Property()
    username?: string

    @ManyToMany({
        entity: () => Cards,
        joinColumn: 'user_id',
        inverseJoinColumn: 'card_id',
    })
    activeCards = new Collection<Cards>(this)

    @Property()
    createdAt = new Date()

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date()
}
