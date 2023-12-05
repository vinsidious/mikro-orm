# Database Migration Guide

## Overview
This migration guide details the steps to migrate an existing schema to a new PostgreSQL schema. Follow the order of the tables based on their dependencies to ensure a smooth migration process.

---

## Table: Attributes
- **Original Table Name**: attributes
- **New Table Name**: attributes
- **Dependencies**: None
- **Columnar Changes**:
    - `attribute`: renamed to `attributeName`
    - `type`: renamed to `attributeType`

---

## Table: Card Types
- **Original Table Name**: cardType
- **New Table Name**: card_types
- **Dependencies**: None
- **Columnar Changes**: None.

---

## Table: Cities
- **Original Table Name**: cities
- **New Table Name**: cities
- **Dependencies**: None (self-referencing foreign key for `majorCityId`)
- **Columnar Changes**:
    - `lat` and `lon`: combined into `location` (PostGIS point)
    - `majorCity`: renamed to `majorCityId` (foreign key to `cities(id)`)

---

## Table: Users
- **Original Table Name**: users
- **New Table Name**: users
- **Dependencies**: cities
- **Columnar Changes**:
    - `currentCity`: renamed to `currentCityId` (foreign key to `cities(id)`)
    - `currentMajorCity`: renamed to `currentMajorCityId` (foreign key to `cities(id)`)
    - `homeBaseCity`: renamed to `homeBaseCityId` (foreign key to `cities(id)`)
    - `homeBaseMajorCity`: renamed to `homeBaseMajorCityId` (foreign key to `cities(id)`)
    - `userCategory`: renamed to `isFullUser` (BOOLEAN)
- **Notes**:
    - `isFullUser` is computed based on whether the original value of `userCategory` is `fullUser`

---

## Table: Invites
- **Original Table Name**: N/A (new table)
- **New Table Name**: invites
- **Dependencies**: users
  - The existing `invites` table from DynamoDB has the `inviter_id` data we need (in its `user` field) and the `users` table from DynamoDB has the `consumer_id` data we need, which is accessible via the `invites` property of the `users` table which is a map of invite code to consumer id.
- **Columnar Changes**:
  - `user`: renamed to `inviter_id` (foreign key to `users(id)`)

---

## Table: Moment Options
- **Original Table Name**: momentOptions
- **New Table Name**: moment_options
- **Dependencies**: None
- **Columnar Changes**:
    - `name`: renamed to `option_name`

---

## Table: Pods
- **Original Table Name**: pods
- **New Table Name**: pods
- **Dependencies**: None
- **Columnar Changes**:
    - `name`: renamed to `pod_name`

---

## Table: Cards
- **Original Table Name**: cards
- **New Table Name**: cards
- **Dependencies**: users, card_types
- **Columnar Changes**:
    - `friendID`: renamed to `friendId` (foreign key to `users(id)`)
    - `type`: renamed to `cardTypeId` (foreign key to `card_types(id)`)

---

## Table: Users Moments
- **Original Table Name**: N/A (new table)
- **New Table Name**: users_moments
- **Dependencies**: users, moment_options
- **Columnar Changes**: None

---

## Table: Popups
- **Original Table Name**: users_popups
- **New Table Name**: popups
- **Dependencies**: users
- **Columnar Changes**: None
- **Notes**:
    - New table to reflect the 1:n relationship of popups to a user; data previously incorrectly represented
    - The `users_popups` table in DynamoDB is mistakenly modeled as a join table (i.e. for a many-to-many relationship) when it should actually be a 1:n relationship (i.e. a user can have many popups, but a popup can only belong to one user)
    - The `id` field in the `users_popups` table in DynamoDB is a concatenated/composite key of the `user_id` and `popup_id` fields (despite the fact that the popup id doesn't appear anywhere else).
    - You must create a new `id` field in the `popups` table in PostgreSQL and populate it with the `popup_id` values from deconstructing the latter portion of the `id` field in the `users_popups` table in DynamoDB.
    - You must create a new `user_id` field in the `popups` table in PostgreSQL and populate it with the `user_id` values from deconstructing the former portion of the `id` field in the `users_popups` table in DynamoDB.

---

## Table: Users Quiz Notes
- **Original Table Name**: users_quizNotes
- **New Table Name**: users_quiz_notes
- **Dependencies**: users, cards
- **Columnar Changes**: None
- **Notes**:
    - New table to store quiz notes associated with `user_id`, related to `current_quiz_card_id`

---

## Table: Users Attributes
- **Original Table Name**: N/A (new table)
- **New Table Name**: users_attributes
- **Dependencies**: users, attributes
- **Columnar Changes**: None
- **Notes**:
    - New many-to-many join table with additional column `answer`

---

## Table: Users Blocked Users
- **Original Table Name**: N/A (new table)
- **New Table Name**: users_blocked_users
- **Dependencies**: users
- **Columnar Changes**: None
- **Notes**:
    - New join table to manage users blocking other users

---

## Table: Users Active Cards
- **Original Table Name**: N/A (new table)
- **New Table Name**: users_active_cards
- **Dependencies**: users, cards
- **Columnar Changes**: None
- **Notes**:
    - New many-to-many join table for active cards

---

## Table: Friend Requests
- **Original Table Name**: N/A (new table)
- **New Table Name**: friend_requests
- **Dependencies**: users
- **Columnar Changes**: None
- **Notes**:
    - New join table for friend requests among users

---

## Table: Friendships
- **Original Table Name**: users_friendshipMetadata
- **New Table Name**: friendships
- **Dependencies**: users
- **Columnar Changes**:
    - `friendsSince`: renamed to `friends_since`
    - `lastCaughtUp`: renamed to `last_caught_up`
    - `profileUnlockedOn`: renamed to `profile_unlocked_on`

---

## Table: Users Pods
- **Original Table Name**: N/A (new table)
- **New Table Name**: users_pods
- **Dependencies**: users, pods
- **Columnar Changes**: None
- **Notes**:
    - New join table for metadata ownership of pods

---

## Table: Users Moments Options
- **Original Table Name**: N/A (new table)
- **New Table Name**: users_moments_options
- **Dependencies**: users, moment_options
- **Columnar Changes**: None
- **Notes**:
    - New join table for moments options chosen by users

---

## Table: Users Pinned Friends
- **Original Table Name**: N/A (new table)
- **New Table Name**: users_pinned_friends
- **Dependencies**: users
- **Columnar Changes**: None
- **Notes**:
    - New join table for managing pinned friends

---

## Table: Users Previous Cities
- **Original Table Name**: N/A (new table)
- **New Table Name**: users_previous_cities
- **Dependencies**: users, cities
- **Columnar Changes**:
    - Renamed `timeLeft` to `left_at`

---

## Table: Users Previous Major Cities
- **Original Table Name**: N/A (new table)
- **New Table Name**: users_previous_major_cities
- **Dependencies**: users, cities
- **Columnar Changes**:
    - Renamed `timeLeft` to `left_at`

---

## Important Notes
- Approach the migration by first addressing tables without dependencies.
- Handle foreign key constraints carefully to maintain referential integrity.
- Use the provided comments to understand the changes and map the old fields to the new fields.
- The guide omits changes related to camelCase to snake_case conversions, as per the stated requirement.
