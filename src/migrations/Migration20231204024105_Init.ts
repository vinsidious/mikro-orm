import { Migration } from '@mikro-orm/migrations';

export class Migration20231204024105_Init extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "cities" drop constraint "cities_major_city_id_fkey";');

    this.addSql('alter table "users" drop constraint "users_current_city_fkey";');
    this.addSql('alter table "users" drop constraint "users_current_major_city_fkey";');
    this.addSql('alter table "users" drop constraint "users_home_base_city_fkey";');
    this.addSql('alter table "users" drop constraint "users_home_base_major_city_fkey";');

    this.addSql('alter table "popups" drop constraint "popups_user_id_fkey";');

    this.addSql('alter table "invites" drop constraint "invites_consumer_id_fkey";');
    this.addSql('alter table "invites" drop constraint "invites_inviter_id_fkey";');

    this.addSql('alter table "friendships" drop constraint "friendships_user_id_a_fkey";');
    this.addSql('alter table "friendships" drop constraint "friendships_user_id_b_fkey";');

    this.addSql('alter table "friend_requests" drop constraint "friend_requests_from_user_id_fkey";');
    this.addSql('alter table "friend_requests" drop constraint "friend_requests_to_user_id_fkey";');

    this.addSql('alter table "cards" drop constraint "cards_card_type_id_fkey";');
    this.addSql('alter table "cards" drop constraint "cards_friend_id_fkey";');

    this.addSql('alter table "users_active_cards" drop constraint "users_active_cards_card_id_fkey";');
    this.addSql('alter table "users_active_cards" drop constraint "users_active_cards_user_id_fkey";');

    this.addSql('alter table "users_blocked_users" drop constraint "users_blocked_users_blocked_id_fkey";');
    this.addSql('alter table "users_blocked_users" drop constraint "users_blocked_users_blocker_id_fkey";');

    this.addSql('alter table "users_moments_options" drop constraint "users_moments_options_moment_option_id_fkey";');
    this.addSql('alter table "users_moments_options" drop constraint "users_moments_options_user_id_fkey";');

    this.addSql('alter table "users_pinned_friends" drop constraint "users_pinned_friends_pinned_friend_id_fkey";');
    this.addSql('alter table "users_pinned_friends" drop constraint "users_pinned_friends_user_id_fkey";');

    this.addSql('alter table "users_attributes" drop constraint "users_attributes_attribute_id_fkey";');
    this.addSql('alter table "users_attributes" drop constraint "users_attributes_user_id_fkey";');

    this.addSql('alter table "users_moments" drop constraint "users_moments_moment_id_fkey";');
    this.addSql('alter table "users_moments" drop constraint "users_moments_user_id_fkey";');

    this.addSql('alter table "users_pods" drop constraint "users_pods_pod_id_fkey";');
    this.addSql('alter table "users_pods" drop constraint "users_pods_user_id_a_fkey";');
    this.addSql('alter table "users_pods" drop constraint "users_pods_user_id_b_fkey";');

    this.addSql('alter table "users_previous_cities" drop constraint "users_previous_cities_city_id_fkey";');
    this.addSql('alter table "users_previous_cities" drop constraint "users_previous_cities_user_id_fkey";');

    this.addSql('alter table "users_previous_major_cities" drop constraint "users_previous_major_cities_major_city_id_fkey";');
    this.addSql('alter table "users_previous_major_cities" drop constraint "users_previous_major_cities_user_id_fkey";');

    this.addSql('alter table "users_quiz_notes" drop constraint "users_quiz_notes_current_quiz_card_fkey";');
    this.addSql('alter table "users_quiz_notes" drop constraint "users_quiz_notes_user_id_fkey";');

    this.addSql('comment on column "attributes"."attribute_name" is null;');
    this.addSql('comment on column "attributes"."emoji_icon" is null;');
    this.addSql('comment on column "attributes"."question_name" is null;');
    this.addSql('comment on column "attributes"."short_name" is null;');
    this.addSql('comment on column "attributes"."attribute_type" is null;');

    this.addSql('comment on column "cities"."country_code" is null;');
    this.addSql('comment on column "cities"."latitude" is null;');
    this.addSql('comment on column "cities"."longitude" is null;');
    this.addSql('comment on column "cities"."major_city_id" is null;');
    this.addSql('comment on column "cities"."readable_name" is null;');
    this.addSql('alter table "cities" add constraint "cities_major_city_id_foreign" foreign key ("major_city_id") references "cities" ("id") on update cascade on delete set null;');

    this.addSql('comment on column "moment_options"."more_information" is null;');
    this.addSql('comment on column "moment_options"."option_name" is null;');

    this.addSql('comment on column "pods"."emoji_icon" is null;');
    this.addSql('comment on column "pods"."pod_name" is null;');

    this.addSql('comment on column "users"."country_code" is null;');
    this.addSql('comment on column "users"."current_city" is null;');
    this.addSql('comment on column "users"."current_major_city" is null;');
    this.addSql('comment on column "users"."date_of_birth" is null;');
    this.addSql('comment on column "users"."home_base_city" is null;');
    this.addSql('comment on column "users"."home_base_major_city" is null;');
    this.addSql('comment on column "users"."created_at" is null;');
    this.addSql('comment on column "users"."is_full_user" is null;');
    this.addSql('alter table "users" add constraint "users_current_city_foreign" foreign key ("current_city") references "cities" ("id") on update cascade on delete set null;');
    this.addSql('alter table "users" add constraint "users_current_major_city_foreign" foreign key ("current_major_city") references "cities" ("id") on update cascade on delete set null;');
    this.addSql('alter table "users" add constraint "users_home_base_city_foreign" foreign key ("home_base_city") references "cities" ("id") on update cascade on delete set null;');
    this.addSql('alter table "users" add constraint "users_home_base_major_city_foreign" foreign key ("home_base_major_city") references "cities" ("id") on update cascade on delete set null;');

    this.addSql('comment on column "popups"."user_id" is null;');
    this.addSql('comment on column "popups"."popup_name" is null;');
    this.addSql('comment on column "popups"."popup_type" is null;');
    this.addSql('comment on column "popups"."started_at" is null;');
    this.addSql('comment on column "popups"."ended_early_at" is null;');
    this.addSql('comment on column "popups"."expired_at" is null;');
    this.addSql('alter table "popups" add constraint "popups_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');
    this.addSql('comment on table "popups" is \'\';');

    this.addSql('comment on column "invites"."id" is null;');
    this.addSql('comment on column "invites"."inviter_id" is null;');
    this.addSql('comment on column "invites"."consumer_id" is null;');
    this.addSql('alter table "invites" add constraint "invites_inviter_id_foreign" foreign key ("inviter_id") references "users" ("id") on update cascade on delete set null;');
    this.addSql('alter table "invites" add constraint "invites_consumer_id_foreign" foreign key ("consumer_id") references "users" ("id") on update cascade on delete set null;');
    this.addSql('comment on table "invites" is \'\';');

    this.addSql('comment on column "friendships"."friends_since" is null;');
    this.addSql('comment on column "friendships"."last_caught_up" is null;');
    this.addSql('comment on column "friendships"."profile_unlocked_on" is null;');
    this.addSql('alter table "friendships" add constraint "friendships_user_id_a_foreign" foreign key ("user_id_a") references "users" ("id") on update cascade;');
    this.addSql('alter table "friendships" add constraint "friendships_user_id_b_foreign" foreign key ("user_id_b") references "users" ("id") on update cascade;');
    this.addSql('comment on table "friendships" is \'\';');

    this.addSql('comment on column "friend_requests"."from_user_id" is null;');
    this.addSql('comment on column "friend_requests"."to_user_id" is null;');
    this.addSql('alter table "friend_requests" add constraint "friend_requests_from_user_id_foreign" foreign key ("from_user_id") references "users" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "friend_requests" add constraint "friend_requests_to_user_id_foreign" foreign key ("to_user_id") references "users" ("id") on update cascade on delete cascade;');
    this.addSql('comment on table "friend_requests" is \'\';');

    this.addSql('comment on column "cards"."friend_id" is null;');
    this.addSql('comment on column "cards"."card_type_id" is null;');
    this.addSql('alter table "cards" add constraint "cards_friend_id_foreign" foreign key ("friend_id") references "users" ("id") on update cascade on delete set null;');
    this.addSql('alter table "cards" add constraint "cards_card_type_id_foreign" foreign key ("card_type_id") references "card_types" ("id") on update cascade on delete set null;');

    this.addSql('alter table "users_active_cards" add constraint "users_active_cards_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "users_active_cards" add constraint "users_active_cards_card_id_foreign" foreign key ("card_id") references "cards" ("id") on update cascade on delete cascade;');
    this.addSql('comment on table "users_active_cards" is \'\';');

    this.addSql('alter table "users_blocked_users" add constraint "users_blocked_users_blocker_id_foreign" foreign key ("blocker_id") references "users" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "users_blocked_users" add constraint "users_blocked_users_blocked_id_foreign" foreign key ("blocked_id") references "users" ("id") on update cascade on delete cascade;');
    this.addSql('comment on table "users_blocked_users" is \'\';');

    this.addSql('alter table "users_moments_options" add constraint "users_moments_options_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "users_moments_options" add constraint "users_moments_options_moment_option_id_foreign" foreign key ("moment_option_id") references "moment_options" ("id") on update cascade on delete cascade;');
    this.addSql('comment on table "users_moments_options" is \'\';');

    this.addSql('alter table "users_pinned_friends" add constraint "users_pinned_friends_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "users_pinned_friends" add constraint "users_pinned_friends_pinned_friend_id_foreign" foreign key ("pinned_friend_id") references "users" ("id") on update cascade on delete cascade;');
    this.addSql('comment on table "users_pinned_friends" is \'\';');

    this.addSql('alter table "users_attributes" add constraint "users_attributes_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "users_attributes" add constraint "users_attributes_attribute_id_foreign" foreign key ("attribute_id") references "attributes" ("id") on update cascade;');
    this.addSql('comment on table "users_attributes" is \'\';');

    this.addSql('comment on column "users_moments"."user_id" is null;');
    this.addSql('comment on column "users_moments"."moment_id" is null;');
    this.addSql('comment on column "users_moments"."created_at" is null;');
    this.addSql('alter table "users_moments" add constraint "users_moments_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "users_moments" add constraint "users_moments_moment_id_foreign" foreign key ("moment_id") references "moment_options" ("id") on update cascade;');

    this.addSql('alter table "users_pods" add constraint "users_pods_user_id_a_foreign" foreign key ("user_id_a") references "users" ("id") on update cascade;');
    this.addSql('alter table "users_pods" add constraint "users_pods_user_id_b_foreign" foreign key ("user_id_b") references "users" ("id") on update cascade;');
    this.addSql('alter table "users_pods" add constraint "users_pods_pod_id_foreign" foreign key ("pod_id") references "pods" ("id") on update cascade;');
    this.addSql('comment on table "users_pods" is \'\';');

    this.addSql('alter table "users_previous_cities" add constraint "users_previous_cities_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "users_previous_cities" add constraint "users_previous_cities_city_id_foreign" foreign key ("city_id") references "cities" ("id") on update cascade;');
    this.addSql('comment on table "users_previous_cities" is \'\';');

    this.addSql('alter table "users_previous_major_cities" add constraint "users_previous_major_cities_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "users_previous_major_cities" add constraint "users_previous_major_cities_major_city_id_foreign" foreign key ("major_city_id") references "cities" ("id") on update cascade;');
    this.addSql('comment on table "users_previous_major_cities" is \'\';');

    this.addSql('comment on column "users_quiz_notes"."user_id" is null;');
    this.addSql('comment on column "users_quiz_notes"."current_quiz_card" is null;');
    this.addSql('comment on column "users_quiz_notes"."last_user_quiz_at" is null;');
    this.addSql('comment on column "users_quiz_notes"."quiz_note_attributes" is null;');
    this.addSql('alter table "users_quiz_notes" add constraint "users_quiz_notes_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "users_quiz_notes" add constraint "users_quiz_notes_current_quiz_card_foreign" foreign key ("current_quiz_card") references "cards" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "cards" drop constraint "cards_friend_id_foreign";');
    this.addSql('alter table "cards" drop constraint "cards_card_type_id_foreign";');

    this.addSql('alter table "cities" drop constraint "cities_major_city_id_foreign";');

    this.addSql('alter table "friend_requests" drop constraint "friend_requests_from_user_id_foreign";');
    this.addSql('alter table "friend_requests" drop constraint "friend_requests_to_user_id_foreign";');

    this.addSql('alter table "friendships" drop constraint "friendships_user_id_a_foreign";');
    this.addSql('alter table "friendships" drop constraint "friendships_user_id_b_foreign";');

    this.addSql('alter table "invites" drop constraint "invites_inviter_id_foreign";');
    this.addSql('alter table "invites" drop constraint "invites_consumer_id_foreign";');

    this.addSql('alter table "popups" drop constraint "popups_user_id_foreign";');

    this.addSql('alter table "users" drop constraint "users_current_city_foreign";');
    this.addSql('alter table "users" drop constraint "users_current_major_city_foreign";');
    this.addSql('alter table "users" drop constraint "users_home_base_city_foreign";');
    this.addSql('alter table "users" drop constraint "users_home_base_major_city_foreign";');

    this.addSql('alter table "users_active_cards" drop constraint "users_active_cards_user_id_foreign";');
    this.addSql('alter table "users_active_cards" drop constraint "users_active_cards_card_id_foreign";');

    this.addSql('alter table "users_attributes" drop constraint "users_attributes_user_id_foreign";');
    this.addSql('alter table "users_attributes" drop constraint "users_attributes_attribute_id_foreign";');

    this.addSql('alter table "users_blocked_users" drop constraint "users_blocked_users_blocker_id_foreign";');
    this.addSql('alter table "users_blocked_users" drop constraint "users_blocked_users_blocked_id_foreign";');

    this.addSql('alter table "users_moments" drop constraint "users_moments_user_id_foreign";');
    this.addSql('alter table "users_moments" drop constraint "users_moments_moment_id_foreign";');

    this.addSql('alter table "users_moments_options" drop constraint "users_moments_options_user_id_foreign";');
    this.addSql('alter table "users_moments_options" drop constraint "users_moments_options_moment_option_id_foreign";');

    this.addSql('alter table "users_pinned_friends" drop constraint "users_pinned_friends_user_id_foreign";');
    this.addSql('alter table "users_pinned_friends" drop constraint "users_pinned_friends_pinned_friend_id_foreign";');

    this.addSql('alter table "users_pods" drop constraint "users_pods_user_id_a_foreign";');
    this.addSql('alter table "users_pods" drop constraint "users_pods_user_id_b_foreign";');
    this.addSql('alter table "users_pods" drop constraint "users_pods_pod_id_foreign";');

    this.addSql('alter table "users_previous_cities" drop constraint "users_previous_cities_user_id_foreign";');
    this.addSql('alter table "users_previous_cities" drop constraint "users_previous_cities_city_id_foreign";');

    this.addSql('alter table "users_previous_major_cities" drop constraint "users_previous_major_cities_user_id_foreign";');
    this.addSql('alter table "users_previous_major_cities" drop constraint "users_previous_major_cities_major_city_id_foreign";');

    this.addSql('alter table "users_quiz_notes" drop constraint "users_quiz_notes_user_id_foreign";');
    this.addSql('alter table "users_quiz_notes" drop constraint "users_quiz_notes_current_quiz_card_foreign";');

    this.addSql('comment on column "attributes"."attribute_name" is \'Renamed from `attribute` to `attribute_name`.\';');
    this.addSql('comment on column "attributes"."emoji_icon" is \'Renamed from `emojiIcon` to `emoji_icon`.\';');
    this.addSql('comment on column "attributes"."question_name" is \'Renamed from `questionName` to `question_name`.\';');
    this.addSql('comment on column "attributes"."short_name" is \'Renamed from `shortName` to `short_name`.\';');
    this.addSql('comment on column "attributes"."attribute_type" is \'Renamed from `type` to `attribute_type`.\';');

    this.addSql('comment on column "cards"."friend_id" is \'Renamed from `friendID` to `friend_id` and defined as a foreign key to `users` table to establish a relation.\';');
    this.addSql('comment on column "cards"."card_type_id" is \'Renamed from `type` to `card_type_id` and established a proper relation to `card_types`.\';');
    this.addSql('alter table "cards" add constraint "cards_card_type_id_fkey" foreign key ("card_type_id") references "card_types" ("id") on update no action on delete no action;');
    this.addSql('alter table "cards" add constraint "cards_friend_id_fkey" foreign key ("friend_id") references "users" ("id") on update no action on delete no action;');

    this.addSql('comment on column "cities"."country_code" is \'Renamed from `countryCode` to `country_code`.\';');
    this.addSql('comment on column "cities"."latitude" is \'Renamed from `lat` to `latitude` for clarity and PostgreSQL naming conventions.\';');
    this.addSql('comment on column "cities"."longitude" is \'Renamed from `lon` to `longitude` for clarity and PostgreSQL naming conventions.\';');
    this.addSql('comment on column "cities"."major_city_id" is \'Renamed from `majorCity` to `major_city_id` to indicate relation to `cities`.\';');
    this.addSql('comment on column "cities"."readable_name" is \'Renamed from `readableName` to `readable_name`.\';');
    this.addSql('alter table "cities" add constraint "cities_major_city_id_fkey" foreign key ("major_city_id") references "cities" ("id") on update no action on delete no action;');

    this.addSql('comment on column "friend_requests"."from_user_id" is \'User ID of the user sending the friend request. This column is populated by transforming the `pendingFriends` list in DynamoDB, associating the sender\'\'s user ID as the `from_user_id` in this table.\';');
    this.addSql('comment on column "friend_requests"."to_user_id" is \'User ID of the user receiving the friend request. This column is populated by transforming the `friendRequests` list in DynamoDB, where each entry in the list is a user ID that has sent a request to the user, and here it is stored as the `to_user_id`.\';');
    this.addSql('alter table "friend_requests" add constraint "friend_requests_from_user_id_fkey" foreign key ("from_user_id") references "users" ("id") on update no action on delete no action;');
    this.addSql('alter table "friend_requests" add constraint "friend_requests_to_user_id_fkey" foreign key ("to_user_id") references "users" ("id") on update no action on delete no action;');
    this.addSql('comment on table "friend_requests" is \'Join table for managing friend requests among users. This table represents a many-to-many relationship where one user sends a friend request to another user. `from_user_id` represents the user who initiated the friend request, and `to_user_id` represents the user who received the friend request. Data for this table is sourced from the `friendRequests` JSONB attribute in the `users` table from DynamoDB, which contains a list of user IDs representing friends that a user has received friend requests from, as well as from the `pendingFriends` JSONB attribute, which contains a list of user IDs representing the friend requests a user has sent that are awaiting response.\';');

    this.addSql('comment on column "friendships"."friends_since" is \'Renamed from `friendsSince` to `friends_since`.\';');
    this.addSql('comment on column "friendships"."last_caught_up" is \'Renamed from `lastCaughtUp` to `last_caught_up`.\';');
    this.addSql('comment on column "friendships"."profile_unlocked_on" is \'Renamed from `profileUnlockedOn` to `profile_unlocked_on`.\';');
    this.addSql('alter table "friendships" add constraint "friendships_user_id_a_fkey" foreign key ("user_id_a") references "users" ("id") on update no action on delete no action;');
    this.addSql('alter table "friendships" add constraint "friendships_user_id_b_fkey" foreign key ("user_id_b") references "users" ("id") on update no action on delete no action;');
    this.addSql('comment on table "friendships" is \'Represents **unidirectional** friendship/relationship metadata between two users. Each row contains metadata for how `user_id_a` views their friendship with `user_id_b`. Rows may exist in pairs to reflect each user\'\'s perspective in a friendship relation. Data is sourced from the DynamoDB `users_friendshipMetadata` table, with `user_id_a` and `user_id_b` derived from splitting the `id` field of the DynamoDB table. For example, an `id` value of `d72592c6-a0c5-4ae3-89eb-676fd887a765_e7750657-5625-46e4-8f8b-434c7d9d8dcf` would be transformed into `user_id_a` being `d72592c6-a0c5-4ae3-89eb-676fd887a765` and `user_id_b` being `e7750657-5625-46e4-8f8b-434c7d9d8dcf`.\';');

    this.addSql('comment on column "invites"."id" is \'The invite code, represented as TEXT, serves as the primary key. This field stores the invite code from the `id` field of DynamoDB items.\';');
    this.addSql('comment on column "invites"."inviter_id" is \'Rename from `user` on the original DynamoDB object. A UUID referencing the user who created the invite. It establishes a foreign key relationship to the `users` table, identifying the inviter.\';');
    this.addSql('comment on column "invites"."consumer_id" is \'A UUID referencing the user who used this invite code to sign up. Establishes a foreign key relationship to the `users` table, indicating the consumer of the invite code. When migrating data from DynamoDB, map the incoming `users` table\'\'s `invites` field where each key-value pair has the format: the key is the invite code (matching the `id` field in this table) and the value is the consumer\'\'s user ID, here represented as `consumer_id`.\';');
    this.addSql('alter table "invites" add constraint "invites_consumer_id_fkey" foreign key ("consumer_id") references "users" ("id") on update no action on delete no action;');
    this.addSql('alter table "invites" add constraint "invites_inviter_id_fkey" foreign key ("inviter_id") references "users" ("id") on update no action on delete no action;');
    this.addSql('comment on table "invites" is \'Table to store invite codes. Each invite code is unique and identifies an invitation sent by an existing user (`inviter_id`) to a new user (`consumer_id`).\';');

    this.addSql('comment on column "moment_options"."more_information" is \'Renamed from `moreInformation` to `more_information`.\';');
    this.addSql('comment on column "moment_options"."option_name" is \'Renamed from `name` to `option_name`.\';');

    this.addSql('comment on column "pods"."emoji_icon" is \'Renamed from `emojiIcon` to `emoji_icon`.\';');
    this.addSql('comment on column "pods"."pod_name" is \'Renamed from `name` to `pod_name`.\';');

    this.addSql('comment on column "popups"."user_id" is \'Represents the ID of the user associated with this popup, extracted as the `user_id` part from the concatenated primary key in the format `<user_id>_<popup_id>`.\';');
    this.addSql('comment on column "popups"."popup_name" is \'Renamed from `name` to `popup_name` to avoid reserved keyword.\';');
    this.addSql('comment on column "popups"."popup_type" is \'Renamed from `type` to `popup_type` to avoid reserved keyword.\';');
    this.addSql('comment on column "popups"."started_at" is \'Renamed from `startedAt` to `started_at` to follow PostgreSQL naming conventions.\';');
    this.addSql('comment on column "popups"."ended_early_at" is \'Renamed from `endedEarlyAt` to `ended_early_at` to follow PostgreSQL naming conventions.\';');
    this.addSql('comment on column "popups"."expired_at" is \'Renamed from `expiredAt` to `expired_at` to follow PostgreSQL naming conventions.\';');
    this.addSql('alter table "popups" add constraint "popups_user_id_fkey" foreign key ("user_id") references "users" ("id") on update no action on delete no action;');
    this.addSql('comment on table "popups" is \'Table to store popup information, reflecting the 1:n relationship from users to popups. Each popup is unique to a user and is not shared across users. This schema change addresses the incorrect implementation in DynamoDB as a join table. Data for this table is sourced from the DynamoDB `users_popups` join table. The `id` value is constructed by extracting the `popup_id` part from the concatenated primary key in the format `<user_id>_<popup_id>`.\';');

    this.addSql('comment on column "users"."country_code" is \'Renamed from `countryCode` to `country_code`.\';');
    this.addSql('comment on column "users"."current_city" is \'Renamed from `currentCity` to `current_city` and defined as a foreign key to `cities` table to establish a relation.\';');
    this.addSql('comment on column "users"."current_major_city" is \'Renamed from `currentMajorCity` to `current_major_city` and defined as a foreign key to `cities` table to establish a relation.\';');
    this.addSql('comment on column "users"."date_of_birth" is \'Converted from TEXT to TIMESTAMP, renamed from `dateOfBirth` to `date_of_birth`.\';');
    this.addSql('comment on column "users"."home_base_city" is \'Renamed from `homeBaseCity` to `home_base_city` and defined as a foreign key to `cities` table to establish a relation.\';');
    this.addSql('comment on column "users"."home_base_major_city" is \'Renamed from `homeBaseMajorCity` to `home_base_major_city` and defined as a foreign key to `cities` table to establish a relation.\';');
    this.addSql('comment on column "users"."created_at" is \'Converted from TEXT to TIMESTAMP, renamed from `timeCreated` to `created_at`.\';');
    this.addSql('comment on column "users"."is_full_user" is \'Renamed from `userCategory` to `is_full_user` and converted to BOOLEAN to represent user status more clearly.\';');
    this.addSql('alter table "users" add constraint "users_current_city_fkey" foreign key ("current_city") references "cities" ("id") on update no action on delete no action;');
    this.addSql('alter table "users" add constraint "users_current_major_city_fkey" foreign key ("current_major_city") references "cities" ("id") on update no action on delete no action;');
    this.addSql('alter table "users" add constraint "users_home_base_city_fkey" foreign key ("home_base_city") references "cities" ("id") on update no action on delete no action;');
    this.addSql('alter table "users" add constraint "users_home_base_major_city_fkey" foreign key ("home_base_major_city") references "cities" ("id") on update no action on delete no action;');

    this.addSql('alter table "users_active_cards" add constraint "users_active_cards_card_id_fkey" foreign key ("card_id") references "cards" ("id") on update no action on delete no action;');
    this.addSql('alter table "users_active_cards" add constraint "users_active_cards_user_id_fkey" foreign key ("user_id") references "users" ("id") on update no action on delete no action;');
    this.addSql('comment on table "users_active_cards" is \'Join table for the many-to-many relationship between users and their active cards. Data for this table is sourced from `activeCards` field in `users` table from DynamoDB, which contains a list of card IDs. Each entry represents a user\'\'s active card.\';');

    this.addSql('alter table "users_attributes" add constraint "users_attributes_attribute_id_fkey" foreign key ("attribute_id") references "attributes" ("id") on update no action on delete no action;');
    this.addSql('alter table "users_attributes" add constraint "users_attributes_user_id_fkey" foreign key ("user_id") references "users" ("id") on update no action on delete no action;');
    this.addSql('comment on table "users_attributes" is \'Join table to represent the many-to-many relationship between users and attributes, with an additional column `answer` for storing user responses. Data originates from `attributes` field in `users` table in DynamoDB, which is a JSON object with attribute IDs as keys and user\'\'s answers as values.\';');

    this.addSql('alter table "users_blocked_users" add constraint "users_blocked_users_blocked_id_fkey" foreign key ("blocked_id") references "users" ("id") on update no action on delete no action;');
    this.addSql('alter table "users_blocked_users" add constraint "users_blocked_users_blocker_id_fkey" foreign key ("blocker_id") references "users" ("id") on update no action on delete no action;');
    this.addSql('comment on table "users_blocked_users" is \'Join table to manage the many-to-many relationship of users blocking other users. Populated from the `blockedUsers` field in the `users` table in DynamoDB, which contains a list of user IDs that a user has blocked.\';');

    this.addSql('comment on column "users_moments"."user_id" is \'Derived from part of the concatenated `id` field in DynamoDB, representing the user.\';');
    this.addSql('comment on column "users_moments"."moment_id" is \'Derived from part of the concatenated `id` field in DynamoDB, representing the moment.\';');
    this.addSql('comment on column "users_moments"."created_at" is \'Renamed from `date` to `created_at` and converted from TEXT to TIMESTAMP.\';');
    this.addSql('alter table "users_moments" add constraint "users_moments_moment_id_fkey" foreign key ("moment_id") references "moment_options" ("id") on update no action on delete no action;');
    this.addSql('alter table "users_moments" add constraint "users_moments_user_id_fkey" foreign key ("user_id") references "users" ("id") on update no action on delete no action;');

    this.addSql('alter table "users_moments_options" add constraint "users_moments_options_moment_option_id_fkey" foreign key ("moment_option_id") references "moment_options" ("id") on update no action on delete no action;');
    this.addSql('alter table "users_moments_options" add constraint "users_moments_options_user_id_fkey" foreign key ("user_id") references "users" ("id") on update no action on delete no action;');
    this.addSql('comment on table "users_moments_options" is \'Join table to represent the many-to-many relationship between users and moment options they have chosen or interacted with. Data for this table comes from the `moments` field in the `users` table in DynamoDB, which contains a list of moment option IDs.\';');

    this.addSql('alter table "users_pinned_friends" add constraint "users_pinned_friends_pinned_friend_id_fkey" foreign key ("pinned_friend_id") references "users" ("id") on update no action on delete no action;');
    this.addSql('alter table "users_pinned_friends" add constraint "users_pinned_friends_user_id_fkey" foreign key ("user_id") references "users" ("id") on update no action on delete no action;');
    this.addSql('comment on table "users_pinned_friends" is \'Join table for managing pinned friends, representing a many-to-many relationship between users and their pinned friends. Based on the `pinnedFriends` field in the `users` table in DynamoDB, which includes a list of user IDs prefixed by "favs/"\';');

    this.addSql('alter table "users_pods" add constraint "users_pods_pod_id_fkey" foreign key ("pod_id") references "pods" ("id") on update no action on delete no action;');
    this.addSql('alter table "users_pods" add constraint "users_pods_user_id_a_fkey" foreign key ("user_id_a") references "users" ("id") on update no action on delete no action;');
    this.addSql('alter table "users_pods" add constraint "users_pods_user_id_b_fkey" foreign key ("user_id_b") references "users" ("id") on update no action on delete no action;');
    this.addSql('comment on table "users_pods" is \'Join table to store pods data specific to each friendship from `user_id_a`\'\'s perspective. A pod is a labeled group of friends, and each record indicates that `user_id_b` is part of a pod according to `user_id_a`. Data is sourced from the `pods` attribute of the DynamoDB `users_friendshipMetadata` table.\';');

    this.addSql('alter table "users_previous_cities" add constraint "users_previous_cities_city_id_fkey" foreign key ("city_id") references "cities" ("id") on update no action on delete no action;');
    this.addSql('alter table "users_previous_cities" add constraint "users_previous_cities_user_id_fkey" foreign key ("user_id") references "users" ("id") on update no action on delete no action;');
    this.addSql('comment on table "users_previous_cities" is \'Join table for representing the previous cities a user has lived in, along with the time they left the city. Data sourced from the `previousCities` field in the `users` table in DynamoDB, a JSON list with each object containing a `location` field (city ID) and a `time_left` field.\';');

    this.addSql('alter table "users_previous_major_cities" add constraint "users_previous_major_cities_major_city_id_fkey" foreign key ("major_city_id") references "cities" ("id") on update no action on delete no action;');
    this.addSql('alter table "users_previous_major_cities" add constraint "users_previous_major_cities_user_id_fkey" foreign key ("user_id") references "users" ("id") on update no action on delete no action;');
    this.addSql('comment on table "users_previous_major_cities" is \'Join table for representing the previous major cities a user has lived in, with a timestamp indicating when they left. Derived from the `previousMajorCities` field in the `users` table in DynamoDB, similar to `previousCities` but for major cities.\';');

    this.addSql('comment on column "users_quiz_notes"."user_id" is \'User identifier for quiz notes.\';');
    this.addSql('comment on column "users_quiz_notes"."current_quiz_card" is \'Relation with the `cards` table. Renamed from `currentQuizCard` to `current_quiz_card`.\';');
    this.addSql('comment on column "users_quiz_notes"."last_user_quiz_at" is \'Converted from TEXT to TIMESTAMP and renamed from `lastUserQuizAt` to `last_user_quiz_at`.\';');
    this.addSql('comment on column "users_quiz_notes"."quiz_note_attributes" is \'Stores quiz-related attribute responses. Consolidated multiple attribute columns into a single JSONB column for flexibility and easier management.\';');
    this.addSql('alter table "users_quiz_notes" add constraint "users_quiz_notes_current_quiz_card_fkey" foreign key ("current_quiz_card") references "cards" ("id") on update no action on delete no action;');
    this.addSql('alter table "users_quiz_notes" add constraint "users_quiz_notes_user_id_fkey" foreign key ("user_id") references "users" ("id") on update no action on delete no action;');
  }

}
