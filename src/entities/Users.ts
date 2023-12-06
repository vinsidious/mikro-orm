import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'

import { Cards } from '@entities/Cards'
import { UsersCards } from '@entities/UsersCards'
import {
    Collection,
    DateType,
    Entity,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OptionalProps,
    PrimaryKey,
    Property,
    Unique,
} from '@mikro-orm/core'

import { Cities } from './Cities'
import { Friendships } from './Friendships'

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

    @OneToMany(() => UsersCards, (uc) => uc.viewer)
    userCards = new Collection<UsersCards>(this)

    @ManyToMany({
        entity: () => Cards,
        owner: true,
        inversedBy: 'viewers',
        pivotEntity: () => UsersCards,
    })
    activeCards = new Collection<Cards>(this)

    @OneToMany(() => Friendships, (friendship) => friendship.user)
    friendships = new Collection<Friendships>(this)

    @Property()
    createdAt = new Date()

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date()
}
