import _ from 'lodash'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'

import { initializeDb } from '@/db'
import { DynamoDBTableNames, DynamoDBTypeMap } from '@migrator/types'
import { EntityManager } from '@mikro-orm/core'

import {
    Attributes,
    Cards,
    CardTypes,
    Cities,
    FriendRequests,
    Friendships,
    Invites,
    MomentOptions,
    Moments,
    Pods,
    Popups,
    QuizAnswers,
    Quizzes,
    Users,
    UsersAttributes,
    UsersCards,
    UsersPinnedFriends,
    UsersPods,
    UsersPreviousCities,
    UsersPreviousMajorCities,
} from '../entities'
import { fetchAllItems } from './dynamo'

// Define the interface for specifying table migrations
interface TableMigration<TTableName extends DynamoDBTableNames> {
    dependsOn: DynamoDBTableNames[]
    preTransform?: (data: DynamoDBTypeMap[TTableName][]) => any
    migrate: (data: DynamoDBTypeMap[TTableName], em: EntityManager) => Promise<any>
}

// Define the migration orchestrator
class MigrationOrchestrator {
    private alreadyMigrated: Set<DynamoDBTableNames> = new Set()
    private em: EntityManager
    private migrationMapping: {
        [K in DynamoDBTableNames]: TableMigration<DynamoDBTableNames>
    } = {} as any

    constructor(em: EntityManager) {
        this.em = em
    }

    // Define the registration method for migrations
    register<TTableName extends DynamoDBTableNames>(
        tableName: TTableName,
        migration: TableMigration<TTableName>
    ) {
        this.migrationMapping[tableName] = migration
    }

    // Run all migrations
    async runMigrations() {
        for (const tableName in this.migrationMapping) {
            await this.runMigration(tableName as DynamoDBTableNames)
        }
    }

    // Run a single migration
    private async runMigration(tableName: DynamoDBTableNames) {
        if (this.alreadyMigrated.has(tableName)) return
        this.alreadyMigrated.add(tableName)

        const migration = this.migrationMapping[tableName]

        // Fetch and migrate dependencies first
        for (const dependency of migration.dependsOn) {
            await this.runMigration(dependency)
        }

        // Fetch table data from DynamoDB
        const rootTableName = tableName.split('.')[0] as DynamoDBTableNames
        const tableData = await fetchAllItems(rootTableName).then((data) =>
            migration.preTransform ? migration.preTransform(data) : data
        )

        // Migrate each item and store in an array
        const entities = []

        for (const dataItem of tableData) {
            const entity = _.castArray(await migration.migrate(dataItem, this.em))
            entities.push(...entity)
        }

        // Persist and flush all entities at once
        await this.em.persistAndFlush(entities)

        console.log(
            `Migrated ${entities.length}/${tableData.length} items from ${tableName}`
        )
    }
}

// Register the migrations within the orchestrator
const initializeOrchestrator = (em: EntityManager): MigrationOrchestrator => {
    const orchestrator = new MigrationOrchestrator(em)

    // Users migration
    orchestrator.register('users', {
        dependsOn: ['cities'],
        migrate: async (dynUser, em) => {
            return em.create(Users, {
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
                createdAt: dynUser.timeCreated,
                isFullUser: dynUser.userCategory === 'fullUser',
                username: dynUser.username,
            })
        },
    })

    // Cities migration
    orchestrator.register('cities', {
        dependsOn: [],
        preTransform: (data) =>
            _.partition(data, (city) => city.id === city.majorCity).flat(),
        migrate: async (data, em) =>
            em.create(Cities, {
                id: data.id,
                countryCode: data.countryCode,
                location: { type: 'Point', coordinates: [data.lon, data.lat] },
                isMajorCity: data.id === data.majorCity ? true : false,
                majorCity:
                    data.id === data.majorCity
                        ? null
                        : em.getReference(Cities, data.majorCity),
                population: data.population,
                readableName: data.readableName,
                timezone: data.timezone,
            }),
    })

    // CardTypes migration
    orchestrator.register('cardType', {
        dependsOn: [],
        preTransform: async (data) => {
            data = _.reject(data, (cardType) => cardType.id === 'static')
            const dynPermaCards = await fetchAllItems('cards').then((cards) =>
                _.filter(cards, 'isPermanent')
            )
            console.log(`Found ${dynPermaCards.length} permanent cards`)
            return [...data, ...dynPermaCards]
        },
        migrate: async (data: any, em) => {
            if (data.isPermanent) {
                const cardTypeId = data.type === 'static' ? uuidv4() : data.type
                return [
                    em.create(CardTypes, {
                        id: cardTypeId,
                        cardBody: data.cardBody,
                        cardTitle: data.cardTitle,
                        icon: data.icon,
                        isPermanent: true,
                        cta: data.cta,
                        color: data.color,
                    }),
                    em.create(Cards, {
                        id: data.id,
                        cardType: em.getReference(CardTypes, cardTypeId),
                        destination: data.destination,
                    }),
                ]
            } else {
                return em.create(CardTypes, {
                    id: data.id,
                    cardBody: data.cardBody,
                    cardTitle: data.cardTitle,
                    icon: data.icon,
                    isPermanent:
                        data.id === 'f9d4aaa1-714d-439f-b2ae-4b8427b0310e' ? true : false,
                    cta: data.cta,
                    color: data.color,
                })
            }
        },
    })

    // Cards migration
    orchestrator.register('cards', {
        dependsOn: ['cardType', 'users'],
        preTransform: async (data) => _.reject(data, 'isPermanent'),
        migrate: async (data, em) => {
            const subject = data.friendID
                ? await em.findOne(Users, { id: data.friendID })
                : null
            return em.create(Cards, {
                id: data.id,
                cardType: em.getReference(CardTypes, data.type),
                context: data.context,
                destination: data.destination,
                subject: subject ? em.getReference(Users, data.friendID) : null,
                questions: data.questions,
            })
        },
    })

    // Attributes migration
    orchestrator.register('attributes', {
        dependsOn: [],
        migrate: async (data, em) =>
            em.create(Attributes, {
                id: data.id,
                attributeName: data.attribute,
                category: data.category,
                emojiIcon: data.emojiIcon,
                questionName: data.questionName,
                shortName: data.shortName,
                attributeType: data.type,
            }),
    })

    // MomentOptions migration
    orchestrator.register('momentOptions', {
        dependsOn: [],
        migrate: async (data, em) => {
            const optionInfo = data.moreInformation.map((info) => ({
                inputType: info.inputType,
                fieldName: info.fieldName,
            }))
            return em.create(MomentOptions, {
                id: data.id,
                moreInformation: optionInfo,
                optionName: data.name,
            })
        },
    })

    // Pods migration
    orchestrator.register('pods', {
        dependsOn: [],
        migrate: async (data, em) =>
            em.create(Pods, {
                id: data.id,
                emojiIcon: data.emojiIcon,
                podName: data.name,
            }),
    })

    // Friendships migration
    orchestrator.register('users_friendshipMetadata', {
        dependsOn: ['users', 'pods'], // Migration depends on having the Users table migrated first.
        migrate: async (data, em) => {
            // Split the 'id' to extract user and friend IDs
            const [userId, friendId] = data.id.split('_')

            // Check if both users exist in the database using Promise.all for better performance
            const [userExists, friendExists] = await Promise.all([
                em.findOne(Users, { id: userId }),
                em.findOne(Users, { id: friendId }),
            ])

            // If either user does not exist, skip this row
            if (!userExists || !friendExists) return []

            const returnedEntities = [
                em.create(Friendships, {
                    user: em.getReference(Users, userId),
                    friend: em.getReference(Users, friendId),
                    friendsSince:
                        data.friendsSince ||
                        data.profileUnlockedOn ||
                        data.lastCaughtUp ||
                        new Date(),
                    lastCaughtUp: data.lastCaughtUp,
                    profileUnlockedOn: data.profileUnlockedOn,
                }),
            ]

            // If the friendship has pods, create the UsersPods entities
            if (data.pods && data.pods.length > 0) {
                const pods = await em.find(Pods, {})
                const usersPods = data.pods.map((podId) => {
                    const pod = pods.find((pod) => pod.id === podId)
                    if (!pod) return null
                    return em.create(UsersPods, {
                        user: em.getReference(Users, userId),
                        friend: em.getReference(Users, friendId),
                        pod: em.getReference(Pods, podId),
                    })
                })
                returnedEntities.push(...(usersPods.filter(Boolean) as any))
            }

            return returnedEntities
        },
    })

    // UsersMoments migration
    orchestrator.register('users_moments', {
        dependsOn: ['users', 'momentOptions'],
        migrate: async (data, em) => {
            // Split the DynamoDB 'id' field into two UUID parts
            const [userId, momentId] = data.id.split('_')

            // Confirm both user and momentOption exist in the database
            const [userExists, momentOptionExists] = await Promise.all([
                em.findOne(Users, { id: userId }),
                em.findOne(MomentOptions, { id: data.momentOptionID }),
            ])

            // If either the user or the momentOption does not exist, do not proceed with this entry
            if (!userExists || !momentOptionExists) return []

            // Create and return the new Moments entity
            return em.create(Moments, {
                id: momentId,
                user: em.getReference(Users, userId),
                momentOption: em.getReference(MomentOptions, data.momentOptionID),
                moreInformation: data.moreInformation,
                createdAt: moment(data.date).toDate(),
            })
        },
    })

    // Popups migration
    orchestrator.register('users_popups', {
        dependsOn: ['users'], // Migration depends on having the Users table migrated first.
        migrate: async (data, em) => {
            // Assume 'id' concatenation pattern '<user_id>_<popup_id>'
            const [userId, popupId] = data.id.split('_')

            // Check if the user referenced by userId exists
            const userExists = await em.findOne(Users, { id: userId })

            // If the user does not exist, skip this popup entry
            if (!userExists) return []

            // Create the Popups entity
            return em.create(Popups, {
                id: popupId,
                user: em.getReference(Users, userId),
                popupName: data.name,
                popupType: data.type,
                startedAt: data.startedAt,
                endedEarlyAt: data.endedEarlyAt,
                expiredAt: data.expiredAt,
            })
        },
    })

    // UsersQuizNotes migration continuation
    orchestrator.register('users_quizNotes', {
        dependsOn: ['users', 'cards', 'attributes'], // Add 'attributes' as a new dependency for the migration.
        migrate: async (data, em) => {
            // Split the DynamoDB 'id' field to get actorId and subjectId
            const [actorId, subjectId] = data.id.split('_')

            // Verify both actor and subject users exist
            const [actorExists, subjectExists, attributesList] = await Promise.all([
                em.findOne(Users, { id: actorId }),
                em.findOne(Users, { id: subjectId }),
                em.find(Attributes, {}), // Fetch all attributes to map from DynamoDB attribute keys to their corresponding Entities
            ])

            // If any user does not exist, skip further processing
            if (!actorExists || !subjectExists) return []

            // Extract currentQuizCardId and verify it exists
            const currentQuizCardExists = data.currentQuizCard
                ? await em.findOne(Cards, { id: data.currentQuizCard })
                : null

            // Create Quizzes entity
            const quiz = em.create(Quizzes, {
                actor: em.getReference(Users, actorId),
                subject: em.getReference(Users, subjectId),
                currentQuizCard: currentQuizCardExists
                    ? em.getReference(Cards, data.currentQuizCard)
                    : null,
                lastActorQuizAt: data.lastUserQuizAt,
            })

            em.persist(quiz)

            // Define a small helper to get an attribute by its dynamo-styled-id
            const getAttributeById = (attrId: string) => {
                const formattedId = [
                    attrId.slice(0, 8),
                    attrId.slice(8, 12),
                    attrId.slice(12, 16),
                    attrId.slice(16, 20),
                    attrId.slice(20),
                ].join('-')
                return attributesList.find((attr) => attr.id === formattedId)
            }

            // Loop over keys in the DynamoDB entry, create QuizAnswers entities if they match attribute pattern
            const quizAnswers = Object.keys(data)
                .filter((key) => key.match(/^[0-9a-f]{32}$/))
                .map((attrId) => {
                    // Extract relevant Attribute entity
                    const attribute = getAttributeById(attrId)
                    if (!attribute) return null // Skip if no matching attribute found

                    // Extract and transform data
                    const { lastQuizAt, cumulativeQuizScore } = data[attrId]

                    // Create and return QuizAnswers entity if data is complete
                    return em.create(QuizAnswers, {
                        quiz: em.getReference(Quizzes, quiz.id),
                        attribute: em.getReference(Attributes, attribute.id),
                        cumulativeScore: cumulativeQuizScore,
                        lastAnsweredAt: lastQuizAt ? new Date(lastQuizAt) : null,
                    })
                })
                .filter(Boolean)

            // Return combined array of Quizzes and QuizAnswers entities
            return [quiz, ...quizAnswers]
        },
    })

    // Invites migration
    orchestrator.register('invites', {
        dependsOn: ['users'],
        preTransform: async (data) => {
            // Fetch all items from the 'users' DynamoDB table which will contain the invites
            const usersItems = await fetchAllItems('users')

            // Transform the 'invites' map from 'users' into an array of Invite object with 'consumer' info
            const inviteObjects = usersItems.reduce((invitesArr, user) => {
                if (user.invites) {
                    Object.entries(user.invites).forEach(([inviteCode, consumerId]) => {
                        invitesArr.push({
                            id: inviteCode, // The invite code serves as 'id'
                            inviter: user.id, // The user ID who created the invite
                            consumer: consumerId, // The ID of the user who consumed the invite
                        })
                    })
                }
                return invitesArr
            }, [])

            // Also consider the 'invites' themselves as not all invites will be consumed
            data.forEach((invite) => {
                if (!inviteObjects.find((obj) => obj.id === invite.id)) {
                    inviteObjects.push({
                        id: invite.id,
                        inviter: invite.user,
                        consumer: null,
                    })
                }
            })

            // Return the transformed data
            return inviteObjects
        },
        migrate: async (invite: any, em) => {
            // Check if both inviter and consumer exist in the users table
            const inviterExists = await em.findOne(Users, invite.inviter)
            const consumerExists = invite.consumer
                ? await em.findOne(Users, invite.consumer)
                : true

            // If either inviter or consumer that's specified doesn't exist, return []
            if (!inviterExists || !consumerExists) return []

            // Since 'preTransform' already shaped the data, we directly create the Invite entity
            return em.create(Invites, {
                id: invite.id,
                inviter: em.getReference(Users, invite.inviter),
                consumer: invite.consumer
                    ? em.getReference(Users, invite.consumer)
                    : null,
            })
        },
    })

    // Additional UsersAttributes migration to handle 'attributes' field in 'users' table
    orchestrator.register('users.attributes', {
        dependsOn: ['users', 'attributes'], // Ensure users and attributes are migrated before users_attributes
        migrate: async (dynUser, em) => {
            if (!dynUser.attributes) return [] // Proceed only if 'attributes' field is present
            const userExists = await em.findOne(Users, { id: dynUser.id })
            if (!userExists) return [] // Skip if user does not exist in Postgres

            const userAttributesEntities = []
            for (const [attributeId, answer] of Object.entries(dynUser.attributes)) {
                const attributeExists = await em.findOne(Attributes, { id: attributeId })
                if (!attributeExists) continue // Skip if attribute does not exist in Postgres

                userAttributesEntities.push(
                    em.create(UsersAttributes, {
                        user: em.getReference(Users, dynUser.id),
                        attribute: em.getReference(Attributes, attributeId),
                        answer,
                    })
                )
            }
            return userAttributesEntities
        },
    })

    // Additional UsersPinnedFriends migration to handle 'pinnedFriends' field in 'users' table
    orchestrator.register('users.pinnedFriends', {
        dependsOn: ['users'], // Ensure users are migrated before users_pinned_friends
        migrate: async (data, em) => {
            if (!Array.isArray(data.pinnedFriends) || data.pinnedFriends.length === 0)
                return [] // Proceed only if 'pinnedFriends' field is present and it's a non-empty array
            const userExists = await em.findOne(Users, { id: data.id })
            if (!userExists) return [] // Skip if user does not exist in Postgres

            const pinnedFriendsEntities = []

            for (const favUserId of data.pinnedFriends) {
                // Verify that the value starts with 'favs/', then extract the UUID
                if (!favUserId.startsWith('favs/')) continue
                const pinnedFriendId = favUserId.slice(5)

                // Check if the pinned friend exists in the database
                const pinnedFriendExists = await em.findOne(Users, { id: pinnedFriendId })
                if (!pinnedFriendExists) continue // Skip if pinned friend does not exist

                // Create the UsersPinnedFriends entity
                pinnedFriendsEntities.push(
                    em.create(UsersPinnedFriends, {
                        user: em.getReference(Users, data.id),
                        pinnedFriend: em.getReference(Users, pinnedFriendId),
                    })
                )
            }
            return pinnedFriendsEntities
        },
    })

    // FriendRequests migration added to the existing migrator pattern
    orchestrator.register('users.friendRequests', {
        dependsOn: ['users'],
        migrate: async (dynUser, em) => {
            const friendRequestsEntities = []

            const handleFriendRequests = async (fromUserId, toUserId) => {
                const [fromUserExists, toUserExists] = await Promise.all([
                    em.findOne(Users, { id: fromUserId }),
                    em.findOne(Users, { id: toUserId }),
                ])
                if (fromUserExists && toUserExists) {
                    friendRequestsEntities.push(
                        em.create(FriendRequests, {
                            fromUser: fromUserExists,
                            toUser: toUserExists,
                        })
                    )
                }
            }

            // Handle incoming friend requests (users that requested to be the current user's friend)
            if (
                Array.isArray(dynUser.friendRequests) &&
                dynUser.friendRequests.length > 0
            ) {
                for (const fromUserId of dynUser.friendRequests) {
                    await handleFriendRequests(fromUserId, dynUser.id)
                }
            }

            // Handle outbound friend requests (users that the current user has requested to befriend)
            if (
                Array.isArray(dynUser.pendingFriends) &&
                dynUser.pendingFriends.length > 0
            ) {
                for (const toUserId of dynUser.pendingFriends) {
                    await handleFriendRequests(dynUser.id, toUserId)
                }
            }

            return friendRequestsEntities
        },
    })

    // PreviousCities migration
    orchestrator.register('users.previousCities', {
        dependsOn: ['users', 'cities'],
        migrate: async (data, em) => {
            const userExists = await em.findOne(Users, { id: data.id })
            if (!userExists) return []

            const previousCitiesEntities = []
            for (const prevCity of data.previousCities) {
                if (!prevCity.location) continue
                const cityExists = prevCity.location
                    ? await em.findOne(Cities, { id: prevCity.location })
                    : null
                if (!cityExists) continue

                previousCitiesEntities.push(
                    em.create(UsersPreviousCities, {
                        user: userExists,
                        city: cityExists,
                        leftAt: prevCity.time_left,
                    })
                )
            }
            return previousCitiesEntities
        },
    })

    // PreviousMajorCities migration
    orchestrator.register('users.previousMajorCities', {
        dependsOn: ['users', 'cities'],
        migrate: async (data, em) => {
            const userExists = await em.findOne(Users, { id: data.id })
            if (!userExists) return [] // Skip if user does not exist in Postgres

            const previousMajorCitiesEntities = []
            for (const prevMajorCity of data.previousMajorCities) {
                if (!prevMajorCity.location) continue // Skip if location is not present
                const majorCityExists = prevMajorCity.location
                    ? await em.findOne(Cities, { id: prevMajorCity.location })
                    : null
                if (!majorCityExists) continue // Skip if major city does not exist in Postgres

                previousMajorCitiesEntities.push(
                    em.create(UsersPreviousMajorCities, {
                        user: userExists,
                        majorCity: majorCityExists,
                        leftAt: prevMajorCity.time_left,
                    })
                )
            }
            return previousMajorCitiesEntities
        },
    })

    // UsersCards migration
    orchestrator.register('users.activeCards', {
        dependsOn: ['users', 'cards'],
        migrate: async (data, em) => {
            if (!data.activeCards || data.activeCards.length === 0) return []
            const viewerExists = await em.findOne(Users, { id: data.id })
            if (!viewerExists) return []

            const usersCardsEntities = []
            for (const cardId of data.activeCards) {
                const cardExists = await em.findOne(Cards, { id: cardId })
                if (!cardExists) continue

                usersCardsEntities.push(
                    em.create(UsersCards, {
                        viewer: viewerExists,
                        card: cardExists,
                    })
                )
            }
            return usersCardsEntities
        },
    })

    return orchestrator
}

// Main execution function
const main = async () => {
    // Set up the entity manager and the orchestrator
    const { em } = await initializeDb()
    const orchestrator = initializeOrchestrator(em)

    // Start migration process
    await orchestrator.runMigrations()

    console.log('Migration complete')
    process.exit(0)
}

// Execute main function
main()
