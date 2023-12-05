import { Cities, Users } from '../entities'
import _ from 'lodash'
import moment from 'moment-timezone'

import { getEm } from '../db'
import { fetchAllItems } from './dynamo'

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
    const dynCities = await fetchAllItems('cities')
    const em = getEm()

    for (const dynCity of dynCities) {
        const city = em.create(Cities, {
            id: dynCity.id,
            countryCode: dynCity.countryCode,
            latitude: dynCity.lat,
            longitude: dynCity.lon,
            majorCity: dynCity.majorCity
                ? em.getReference(Cities, dynCity.majorCity)
                : null,
            population: dynCity.population,
            readableName: dynCity.readableName,
            timezone: dynCity.timezone,
        })

        em.persist(city)
    }

    await em.flush()
}

const main = async () => {
    await migrateCities()
    await migrateUsers()
}

main().then(() => {
    console.log('Migration complete')
    process.exit(0)
})
