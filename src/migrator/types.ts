export type FetchAllItems = <
    TTableName extends keyof DynamoDBTypeMap,
    TType = DynamoDBTypeMap[TTableName]
>(
    tableName: TTableName
) => Promise<Array<TType>>

export type DynamoDBTypeMap = {
    users: User
    cities: City
    attributes: Attribute
    cards: Card
    cardType: CardType
    invites: Invite
    momentOptions: MomentOption
    pods: Pod
    users_friendshipMetadata: FriendshipMetadata
    users_moments: UsersMoment
    users_popups: UsersPopup
    users_quizNotes: UsersQuizNote
    'users.attributes': User
    'users.pinnedFriends': User
    'users.friendRequests': User
    'users.previousCities': User
    'users.previousMajorCities': User
    'users.activeCards': User
    'users.pods': User
    'users.blockedUsers': User
}

export type DynamoDBTableNames = keyof DynamoDBTypeMap

export type DynamoDBTypes =
    | User
    | City
    | Attribute
    | Card
    | CardType
    | Invite
    | MomentOption
    | Pod
    | FriendshipMetadata
    | UsersMoment
    | UsersPopup
    | UsersQuizNote

export type Attribute = {
    id: string
    shortName: string
    inputType: string
    emojiIcon: string
    category: string
    attribute: string
    questionName: string
    type: string
}

export type City = {
    id: string // The unique identifier composed of cityName and coordinates
    readableName: string // The human-readable name of the city
    majorCity: string // The closest major city and its coordinates
    countryCode: string // Short country code representing the country the city is in
    lon: number // Longitude coordinate of the city
    lat: number // Latitude coordinate of the city
    timezone: string // The timezone identifier for the city
    population: number // The population count of the city
}

export type MomentOption = {
    id: string
    name: string
    moreInformation: Array<{
        inputType: 'text' | 'city'
        fieldName: string
    }>
}

export type Pod = {
    id: string
    name: string
    emojiIcon: string
}

export type FriendshipMetadata = {
    id: string
    profileUnlockedOn?: string
    friendsSince?: string
    lastCaughtUp?: string
    pods?: string[]
}

export type MoreInformationItem = Record<string, string>

interface UsersMoment {
    id: string
    momentOptionID: string
    name: string
    date: string
    moreInformation: MoreInformationItem[]
}

export type UsersPopup = {
    id: string
    name: string
    type: string
    startedAt: string
    expiredAt: string
    endedEarlyAt?: string
}

export type UsersQuizNote = {
    id: string
    currentQuizCard: string
    lastUserQuizAt?: string
} & {
    [key: string]: {
        lastQuizAt: string
        cumulativeQuizScore: number
    }
}

export type User = {
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

export type Invite = {
    id: string
    user: string
}

type Option = string

interface Question {
    options: Option[]
    attribute: string
    correctAnswer: string
    questionText: string
}

interface MoreInformation {
    [key: string]: string
}

interface EventContext {
    date: string
    name: string
    moreInformation: MoreInformation[]
    momentOptionID: string
    id: string
    friendID: string
}

interface Context {
    event: EventContext
    eventID: string
}

export type Card = {
    id: string
    isPermanent: boolean
    icon: string
    cardTitle: string
    cardBody: string
    color: string
    countActive: number
    cta?: string
    type: string
    destination: string
    questions?: Question[]
    friendID?: string
    context?: Context
    confetti?: string
}

export type CardType = {
    id: string
    icon: string
    cardTitle: string
    cardBody: string
    cta: string
    color: string
}
