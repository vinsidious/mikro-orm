import { existsSync, readFileSync, writeFileSync } from 'fs'
import _ from 'lodash'
import moment from 'moment-timezone'

import { initializeDb } from '@/db'

import { getEm } from '../db'
import { Cards, CardTypes, Cities, Users } from '../entities'
import { fetchAllItems } from './dynamo'
import { City } from './types'

const convertDynamoDBTimestamp = (timestamp: string) => moment(timestamp).toDate()

const migrateUsers = async () => {
    const dynUsers = await fetchAllItems('users')
    const em = getEm()

    for (const dynUser of dynUsers) {
        const user = em.create(Users, {
            id: dynUser.id,
            firstName: dynUser.firstName,
            lastName: dynUser.lastName,
            countryCode: dynUser.countryCode,
            countAttribute: dynUser.countAttribute,
            countQuiz: dynUser.countQuiz,
            currentCity: dynUser.currentCity
                ? em.getReference(Cities, dynUser.currentCity)
                : null,
            currentMajorCity: dynUser.currentMajorCity
                ? em.getReference(Cities, dynUser.currentMajorCity)
                : null,
            dateOfBirth: moment(dynUser.dateOfBirth).format('YYYY-MM-DD'),
            expoPushToken: dynUser.expoPushToken,
            homeBaseCity: dynUser.homeBaseCity
                ? em.getReference(Cities, dynUser.homeBaseCity)
                : null,
            homeBaseMajorCity: dynUser.homeBaseMajorCity
                ? em.getReference(Cities, dynUser.homeBaseMajorCity)
                : null,
            phoneNumber: dynUser.phoneNumber,
            profilePictureKey: dynUser.profilePictureKey,
            socials: dynUser.socials,
            createdAt: convertDynamoDBTimestamp(dynUser.timeCreated),
            isFullUser: dynUser.userCategory === 'fullUser',
            username: dynUser.username,
        })

        em.persist(user)
    }

    await em.flush()
}

const migrateCities = async () => {
    let majorCities: City[], minorCities: City[]

    if (existsSync('major_cities.json') && existsSync('minor_cities.json')) {
        majorCities = JSON.parse(readFileSync('major_cities.json', 'utf8'))
        minorCities = JSON.parse(readFileSync('minor_cities.json', 'utf8'))
    } else {
        ;[majorCities, minorCities] = await fetchAllItems('cities').then((cities) =>
            _.partition(cities, (city) => city.id === city.majorCity)
        )
        writeFileSync('major_cities.json', JSON.stringify(majorCities))
        writeFileSync('minor_cities.json', JSON.stringify(minorCities))
    }

    const em = getEm()

    const createBatchOfCities = async (dynCities: City[]) => {
        const cities = _.map(dynCities, (dynCity) =>
            _.assign(new Cities(), {
                id: dynCity.id,
                countryCode: dynCity.countryCode,
                location: {
                    type: 'Point',
                    coordinates: [dynCity.lon, dynCity.lat],
                },
                majorCity: dynCity.majorCity
                    ? em.getReference(Cities, dynCity.majorCity)
                    : null,
                population: dynCity.population,
                readableName: dynCity.readableName,
                timezone: dynCity.timezone,
            })
        )
        await em.persistAndFlush(cities)
    }

    await createBatchOfCities(majorCities)
    await createBatchOfCities(minorCities)
}

const migrateCardTypes = async () => {
    const dynCardTypes = await fetchAllItems('cardType').then((cardTypes) =>
        _.reject(cardTypes, (cardType) => cardType.id === 'static')
    )
    const dynPermaCards = await fetchAllItems('cards').then((cards) =>
        _.filter(cards, 'isPermanent')
    )

    const em = getEm()

    for (const dynCardType of dynCardTypes) {
        const cardType = em.create(CardTypes, {
            id: dynCardType.id,
            cardBody: dynCardType.cardBody,
            cardTitle: dynCardType.cardTitle,
            icon: dynCardType.icon,
            isPermanent:
                dynCardType.id === 'f9d4aaa1-714d-439f-b2ae-4b8427b0310e' ? true : false,
            cta: dynCardType.cta,
            color: dynCardType.color,
        })

        await em.persistAndFlush(cardType)
    }

    for (const dynCardType of dynPermaCards) {
        const cardType = em.create(CardTypes, {
            cardBody: dynCardType.cardBody,
            cardTitle: dynCardType.cardTitle,
            icon: dynCardType.icon,
            isPermanent: true,
            cta: dynCardType.cta,
            color: dynCardType.color,
        })

        await em.persistAndFlush(cardType)

        const card = em.create(Cards, {
            id: dynCardType.id,
            cardType: em.getReference(
                CardTypes,
                dynCardType.type === 'static' ? cardType.id : dynCardType.type
            ),
            destination: dynCardType.destination,
        })

        await em.persistAndFlush(card)
    }
}

const migrateCards = async () => {
    const dynCards = await fetchAllItems('cards').then((cards) =>
        _.reject(cards, 'isPermanent')
    )

    const em = getEm()

    for (const dynCard of dynCards) {
        const friend =
            dynCard.friendID && (await em.findOne(Users, { id: dynCard.friendID }))
        const card = em.create(Cards, {
            id: dynCard.id,
            cardType: em.getReference(CardTypes, dynCard.type),
            context: dynCard.context,
            destination: dynCard.destination,
            friend: friend ? em.getReference(Users, dynCard.friendID) : null,
            questions: dynCard.questions,
        })

        em.persist(card)
    }

    await em.flush()
}

const main = async () => {
    await initializeDb()

    await migrateCities()
    await migrateUsers()
    await migrateCardTypes()
    await migrateCards()
}

main().then(() => {
    console.log('Migration complete')
    process.exit(0)
})
