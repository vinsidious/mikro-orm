export type FetchAllItems = <
    TTableName extends keyof TypeMap,
    TType = TypeMap[TTableName]
>(
    tableName: TTableName
) => Promise<Array<TType>>

export type TypeMap = {
    users: User
    cities: City
    attributes: Attribute
    cards: Card
    cardTypes: CardType
    invites: Invite
    momentOptions: MomentOption
    pods: Pod
    users_friendshipMetadata: FriendshipMetadata
    users_moments: UsersMoment
    users_popups: UsersPopup
    users_quizNotes: UsersQuizNote
}

type Attribute = {
    id: string
    shortName: string
    inputType: string
    emojiIcon: string
    category: string
    attribute: string
    questionName: string
    type: string
}

type City = {
    id: string // The unique identifier composed of cityName and coordinates
    readableName: string // The human-readable name of the city
    majorCity: string // The closest major city and its coordinates
    countryCode: string // Short country code representing the country the city is in
    lon: number // Longitude coordinate of the city
    lat: number // Latitude coordinate of the city
    timezone: string // The timezone identifier for the city
    population: number // The population count of the city
}

type Question = {
    options: string[]
    attribute: string
    correctAnswer: string
    questionText: string
}

type Context = {
    friendID?: string
    attributeID?: string
    city?: string
    previous_city?: string
    event?: {
        date: string
        name: string
        moreInformation: Record<string, string>[]
        momentOptionID: string
        id: string
    }
    eventID?: string
    correctAttribute?: string
}

type Card = {
    id: string
    friendID?: string
    destination: string
    type: string
    countActive: number
    context?: Context
    questions?: Question[]
    eventID?: string
}

type CardType = {
    id: string
    icon: 'avatar' | 'friends' | 'places' | 'favs' | 'pulse'
    cardTitle: string
    cardBody: string
    cta: string
    color: 'Green' | 'Purple' | 'Orange' | 'Blue' | 'Yellow' | 'White'
}

type Invite = {
    id: string
    user: string
}

type MomentOption = {
    id: string
    name: string
    moreInformation: Array<{
        inputType: 'text' | 'city'
        fieldName: string
    }>
}

type Pod = {
    id: string
    name: string
    emojiIcon: string
}

type FriendshipMetadata = {
    id: string
    profileUnlockedOn?: string
    friendsSince?: string
    lastCaughtUp?: string
    pods?: string[]
}

type MoreInformationItem = Record<string, string>

interface UsersMoment {
    id: string
    momentOptionID: string
    name: string
    date: string
    moreInformation: MoreInformationItem[]
}

type UsersPopup = {
    id: string
    name: string
    type: string
    startedAt: string
    expiredAt: string
    endedEarlyAt?: string
}

type UsersQuizNote = {
    id: string
    currentQuizCard: string
    lastUserQuizAt?: string
    [key: string]:
        | {
              lastQuizAt: string
              cumulativeQuizScore: number
          }
        | string
        | undefined
}

type User = {
    id: string
    username: string
    firstName: string
    lastName: string
    dateOfBirth: string
    phoneNumber: string
    countryCode: string
    userCategory: string
    attributes: Record<string, string | null>
    socials: Record<string, string>
    homeBaseCity: string
    homeBaseMajorCity: string
    currentCity: string
    currentMajorCity: string
    previousCities: Array<{ location: string | null; time_left: string }>
    previousMajorCities: Array<{ location: string; time_left: string }> | []
    activeCards: string[]
    friends: string[]
    pendingFriends: string[]
    blockedUsers: string[]
    blockedBy: string[]
    friendRequests: string[]
    invites: Record<string, string | null>
    moments?: string[]
    expoPushToken?: string
    pinnedFriends?: string[]
    profilePictureKey: string
    countAttribute: number
    countQuiz: number
    timezone: string
    location?: string | null
    popups?: string[]
    timeCreated: string
}
