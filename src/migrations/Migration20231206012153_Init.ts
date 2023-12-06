import { Migration } from '@mikro-orm/migrations';

export class Migration20231206012153_Init extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "cities" drop constraint "cities_major_city_id_fkey";');

    this.addSql('alter table "users" drop constraint "users_current_city_id_fkey";');
    this.addSql('alter table "users" drop constraint "users_current_major_city_id_fkey";');
    this.addSql('alter table "users" drop constraint "users_home_base_city_id_fkey";');
    this.addSql('alter table "users" drop constraint "users_home_base_major_city_id_fkey";');

    this.addSql('alter table "popups" drop constraint "popups_user_id_fkey";');

    this.addSql('alter table "moments" drop constraint "moments_moment_option_id_fkey";');
    this.addSql('alter table "moments" drop constraint "moments_user_id_fkey";');

    this.addSql('alter table "invites" drop constraint "invites_consumer_id_fkey";');
    this.addSql('alter table "invites" drop constraint "invites_inviter_id_fkey";');

    this.addSql('alter table "friendships" drop constraint "friendships_friend_id_fkey";');
    this.addSql('alter table "friendships" drop constraint "friendships_user_id_fkey";');

    this.addSql('alter table "friend_requests" drop constraint "friend_requests_from_user_id_fkey";');
    this.addSql('alter table "friend_requests" drop constraint "friend_requests_to_user_id_fkey";');

    this.addSql('alter table "cards" drop constraint "cards_card_type_id_fkey";');
    this.addSql('alter table "cards" drop constraint "cards_subject_id_fkey";');

    this.addSql('alter table "quizzes" drop constraint "quizzes_actor_id_fkey";');
    this.addSql('alter table "quizzes" drop constraint "quizzes_current_quiz_card_id_fkey";');
    this.addSql('alter table "quizzes" drop constraint "quizzes_subject_id_fkey";');

    this.addSql('alter table "quiz_answers" drop constraint "quiz_answers_attribute_id_fkey";');
    this.addSql('alter table "quiz_answers" drop constraint "quiz_answers_quiz_id_fkey";');

    this.addSql('alter table "users_attributes" drop constraint "users_attributes_attribute_id_fkey";');
    this.addSql('alter table "users_attributes" drop constraint "users_attributes_user_id_fkey";');

    this.addSql('alter table "users_blocked_users" drop constraint "users_blocked_users_blocked_id_fkey";');
    this.addSql('alter table "users_blocked_users" drop constraint "users_blocked_users_blocker_id_fkey";');

    this.addSql('alter table "users_cards" drop constraint "users_cards_card_id_fkey";');
    this.addSql('alter table "users_cards" drop constraint "users_cards_user_id_fkey";');

    this.addSql('alter table "users_pinned_friends" drop constraint "users_pinned_friends_pinned_friend_id_fkey";');
    this.addSql('alter table "users_pinned_friends" drop constraint "users_pinned_friends_user_id_fkey";');

    this.addSql('alter table "users_pods" drop constraint "users_pods_friend_id_fkey";');
    this.addSql('alter table "users_pods" drop constraint "users_pods_pod_id_fkey";');
    this.addSql('alter table "users_pods" drop constraint "users_pods_user_id_fkey";');

    this.addSql('alter table "users_previous_cities" drop constraint "users_previous_cities_city_id_fkey";');
    this.addSql('alter table "users_previous_cities" drop constraint "users_previous_cities_user_id_fkey";');

    this.addSql('alter table "users_previous_major_cities" drop constraint "users_previous_major_cities_major_city_id_fkey";');
    this.addSql('alter table "users_previous_major_cities" drop constraint "users_previous_major_cities_user_id_fkey";');

    this.addSql('alter table "attributes" alter column "id" drop default;');
    this.addSql('alter table "attributes" alter column "id" type UUID using ("id"::UUID);');
    this.addSql('alter table "attributes" alter column "created_at" drop default;');
    this.addSql('alter table "attributes" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "attributes" alter column "created_at" set not null;');
    this.addSql('alter table "attributes" alter column "updated_at" drop default;');
    this.addSql('alter table "attributes" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "attributes" alter column "updated_at" set not null;');
    this.addSql('comment on column "attributes"."attribute_name" is null;');
    this.addSql('comment on column "attributes"."emoji_icon" is null;');
    this.addSql('comment on column "attributes"."question_name" is null;');
    this.addSql('comment on column "attributes"."short_name" is null;');
    this.addSql('comment on column "attributes"."attribute_type" is null;');

    this.addSql('alter table "card_types" alter column "id" drop default;');
    this.addSql('alter table "card_types" alter column "id" type UUID using ("id"::UUID);');
    this.addSql('alter table "card_types" alter column "is_permanent" type boolean using ("is_permanent"::boolean);');
    this.addSql('alter table "card_types" alter column "is_permanent" set not null;');
    this.addSql('alter table "card_types" alter column "created_at" drop default;');
    this.addSql('alter table "card_types" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "card_types" alter column "created_at" set not null;');
    this.addSql('alter table "card_types" alter column "updated_at" drop default;');
    this.addSql('alter table "card_types" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "card_types" alter column "updated_at" set not null;');
    this.addSql('comment on table "card_types" is \'\';');

    this.addSql('alter table "cities" alter column "location" type text using ("location"::text);');
    this.addSql('alter table "cities" alter column "is_major_city" type boolean using ("is_major_city"::boolean);');
    this.addSql('alter table "cities" alter column "is_major_city" set not null;');
    this.addSql('alter table "cities" alter column "population" type numeric using ("population"::numeric);');
    this.addSql('alter table "cities" alter column "population" set not null;');
    this.addSql('alter table "cities" alter column "created_at" drop default;');
    this.addSql('alter table "cities" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "cities" alter column "created_at" set not null;');
    this.addSql('alter table "cities" alter column "updated_at" drop default;');
    this.addSql('alter table "cities" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "cities" alter column "updated_at" set not null;');
    this.addSql('comment on column "cities"."country_code" is null;');
    this.addSql('comment on column "cities"."major_city_id" is null;');
    this.addSql('comment on column "cities"."readable_name" is null;');
    this.addSql('alter table "cities" add constraint "cities_major_city_id_foreign" foreign key ("major_city_id") references "cities" ("id") on update cascade on delete set null;');

    this.addSql('alter table "moment_options" alter column "id" drop default;');
    this.addSql('alter table "moment_options" alter column "id" type UUID using ("id"::UUID);');
    this.addSql('alter table "moment_options" alter column "created_at" drop default;');
    this.addSql('alter table "moment_options" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "moment_options" alter column "created_at" set not null;');
    this.addSql('alter table "moment_options" alter column "updated_at" drop default;');
    this.addSql('alter table "moment_options" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "moment_options" alter column "updated_at" set not null;');
    this.addSql('comment on column "moment_options"."more_information" is null;');
    this.addSql('comment on column "moment_options"."option_name" is null;');

    this.addSql('alter table "pods" alter column "id" drop default;');
    this.addSql('alter table "pods" alter column "id" type UUID using ("id"::UUID);');
    this.addSql('alter table "pods" alter column "created_at" drop default;');
    this.addSql('alter table "pods" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "pods" alter column "created_at" set not null;');
    this.addSql('alter table "pods" alter column "updated_at" drop default;');
    this.addSql('alter table "pods" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "pods" alter column "updated_at" set not null;');
    this.addSql('comment on column "pods"."emoji_icon" is null;');
    this.addSql('comment on column "pods"."pod_name" is null;');

    this.addSql('alter table "users" alter column "id" drop default;');
    this.addSql('alter table "users" alter column "id" type UUID using ("id"::UUID);');
    this.addSql('alter table "users" alter column "count_attribute" type numeric using ("count_attribute"::numeric);');
    this.addSql('alter table "users" alter column "count_attribute" set not null;');
    this.addSql('alter table "users" alter column "count_quiz" type numeric using ("count_quiz"::numeric);');
    this.addSql('alter table "users" alter column "count_quiz" set not null;');
    this.addSql('alter table "users" alter column "is_full_user" type boolean using ("is_full_user"::boolean);');
    this.addSql('alter table "users" alter column "is_full_user" set not null;');
    this.addSql('alter table "users" alter column "created_at" drop default;');
    this.addSql('alter table "users" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "users" alter column "created_at" set not null;');
    this.addSql('alter table "users" alter column "updated_at" drop default;');
    this.addSql('alter table "users" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "users" alter column "updated_at" set not null;');
    this.addSql('comment on column "users"."country_code" is null;');
    this.addSql('comment on column "users"."date_of_birth" is null;');
    this.addSql('comment on column "users"."home_base_city_id" is null;');
    this.addSql('comment on column "users"."home_base_major_city_id" is null;');
    this.addSql('comment on column "users"."current_city_id" is null;');
    this.addSql('comment on column "users"."current_major_city_id" is null;');
    this.addSql('alter table "users" add constraint "users_current_city_id_foreign" foreign key ("current_city_id") references "cities" ("id") on update cascade on delete set null;');
    this.addSql('alter table "users" add constraint "users_current_major_city_id_foreign" foreign key ("current_major_city_id") references "cities" ("id") on update cascade on delete set null;');
    this.addSql('alter table "users" add constraint "users_home_base_city_id_foreign" foreign key ("home_base_city_id") references "cities" ("id") on update cascade on delete set null;');
    this.addSql('alter table "users" add constraint "users_home_base_major_city_id_foreign" foreign key ("home_base_major_city_id") references "cities" ("id") on update cascade on delete set null;');

    this.addSql('alter table "popups" alter column "id" drop default;');
    this.addSql('alter table "popups" alter column "id" type UUID using ("id"::UUID);');
    this.addSql('alter table "popups" alter column "created_at" drop default;');
    this.addSql('alter table "popups" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "popups" alter column "created_at" set not null;');
    this.addSql('alter table "popups" alter column "updated_at" drop default;');
    this.addSql('alter table "popups" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "popups" alter column "updated_at" set not null;');
    this.addSql('comment on column "popups"."user_id" is null;');
    this.addSql('comment on column "popups"."popup_name" is null;');
    this.addSql('comment on column "popups"."popup_type" is null;');
    this.addSql('comment on column "popups"."started_at" is null;');
    this.addSql('comment on column "popups"."ended_early_at" is null;');
    this.addSql('comment on column "popups"."expired_at" is null;');
    this.addSql('alter table "popups" add constraint "popups_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');
    this.addSql('comment on table "popups" is \'\';');

    this.addSql('alter table "moments" alter column "created_at" drop default;');
    this.addSql('alter table "moments" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "moments" alter column "created_at" set not null;');
    this.addSql('alter table "moments" alter column "updated_at" drop default;');
    this.addSql('alter table "moments" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "moments" alter column "updated_at" set not null;');
    this.addSql('comment on column "moments"."id" is null;');
    this.addSql('comment on column "moments"."user_id" is null;');
    this.addSql('comment on column "moments"."moment_option_id" is null;');
    this.addSql('alter table "moments" add constraint "moments_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete set null;');
    this.addSql('alter table "moments" add constraint "moments_moment_option_id_foreign" foreign key ("moment_option_id") references "moment_options" ("id") on update cascade on delete set null;');
    this.addSql('comment on table "moments" is \'\';');

    this.addSql('alter table "invites" alter column "created_at" drop default;');
    this.addSql('alter table "invites" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "invites" alter column "created_at" set not null;');
    this.addSql('alter table "invites" alter column "updated_at" drop default;');
    this.addSql('alter table "invites" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "invites" alter column "updated_at" set not null;');
    this.addSql('comment on column "invites"."id" is null;');
    this.addSql('comment on column "invites"."inviter_id" is null;');
    this.addSql('comment on column "invites"."consumer_id" is null;');
    this.addSql('alter table "invites" add constraint "invites_inviter_id_foreign" foreign key ("inviter_id") references "users" ("id") on update cascade on delete set null;');
    this.addSql('alter table "invites" add constraint "invites_consumer_id_foreign" foreign key ("consumer_id") references "users" ("id") on update cascade on delete set null;');
    this.addSql('comment on table "invites" is \'\';');

    this.addSql('alter table "friendships" alter column "friends_since" type timestamptz using ("friends_since"::timestamptz);');
    this.addSql('alter table "friendships" alter column "friends_since" set not null;');
    this.addSql('alter table "friendships" alter column "created_at" drop default;');
    this.addSql('alter table "friendships" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "friendships" alter column "created_at" set not null;');
    this.addSql('alter table "friendships" alter column "updated_at" drop default;');
    this.addSql('alter table "friendships" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "friendships" alter column "updated_at" set not null;');
    this.addSql('comment on column "friendships"."last_caught_up" is null;');
    this.addSql('comment on column "friendships"."profile_unlocked_on" is null;');
    this.addSql('alter table "friendships" add constraint "friendships_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "friendships" add constraint "friendships_friend_id_foreign" foreign key ("friend_id") references "users" ("id") on update cascade;');
    this.addSql('comment on table "friendships" is \'\';');

    this.addSql('alter table "friend_requests" alter column "status" type text using ("status"::text);');
    this.addSql('alter table "friend_requests" alter column "status" set default \'PENDING\';');
    this.addSql('alter table "friend_requests" alter column "status" set not null;');
    this.addSql('alter table "friend_requests" alter column "created_at" drop default;');
    this.addSql('alter table "friend_requests" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "friend_requests" alter column "created_at" set not null;');
    this.addSql('alter table "friend_requests" alter column "updated_at" drop default;');
    this.addSql('alter table "friend_requests" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "friend_requests" alter column "updated_at" set not null;');
    this.addSql('comment on column "friend_requests"."from_user_id" is null;');
    this.addSql('comment on column "friend_requests"."to_user_id" is null;');
    this.addSql('alter table "friend_requests" add constraint "friend_requests_from_user_id_foreign" foreign key ("from_user_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "friend_requests" add constraint "friend_requests_to_user_id_foreign" foreign key ("to_user_id") references "users" ("id") on update cascade;');
    this.addSql('comment on table "friend_requests" is \'\';');

    this.addSql('alter table "cards" drop column "is_permanent";');

    this.addSql('alter table "cards" alter column "id" drop default;');
    this.addSql('alter table "cards" alter column "id" type UUID using ("id"::UUID);');
    this.addSql('alter table "cards" alter column "created_at" drop default;');
    this.addSql('alter table "cards" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "cards" alter column "created_at" set not null;');
    this.addSql('alter table "cards" alter column "updated_at" drop default;');
    this.addSql('alter table "cards" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "cards" alter column "updated_at" set not null;');
    this.addSql('comment on column "cards"."subject_id" is null;');
    this.addSql('comment on column "cards"."card_type_id" is null;');
    this.addSql('alter table "cards" add constraint "cards_subject_id_foreign" foreign key ("subject_id") references "users" ("id") on update cascade on delete set null;');
    this.addSql('alter table "cards" add constraint "cards_card_type_id_foreign" foreign key ("card_type_id") references "card_types" ("id") on update cascade on delete set null;');
    this.addSql('comment on table "cards" is \'\';');

    this.addSql('alter table "quizzes" alter column "id" drop default;');
    this.addSql('alter table "quizzes" alter column "id" type UUID using ("id"::UUID);');
    this.addSql('alter table "quizzes" alter column "created_at" drop default;');
    this.addSql('alter table "quizzes" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "quizzes" alter column "created_at" set not null;');
    this.addSql('alter table "quizzes" alter column "updated_at" drop default;');
    this.addSql('alter table "quizzes" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "quizzes" alter column "updated_at" set not null;');
    this.addSql('comment on column "quizzes"."actor_id" is null;');
    this.addSql('comment on column "quizzes"."subject_id" is null;');
    this.addSql('comment on column "quizzes"."current_quiz_card_id" is null;');
    this.addSql('comment on column "quizzes"."last_actor_quiz_at" is null;');
    this.addSql('alter table "quizzes" add constraint "quizzes_actor_id_foreign" foreign key ("actor_id") references "users" ("id") on update cascade on delete set null;');
    this.addSql('alter table "quizzes" add constraint "quizzes_subject_id_foreign" foreign key ("subject_id") references "users" ("id") on update cascade on delete set null;');
    this.addSql('alter table "quizzes" add constraint "quizzes_current_quiz_card_id_foreign" foreign key ("current_quiz_card_id") references "cards" ("id") on update cascade on delete set null;');
    this.addSql('comment on table "quizzes" is \'\';');

    this.addSql('alter table "quiz_answers" alter column "id" drop default;');
    this.addSql('alter table "quiz_answers" alter column "id" type UUID using ("id"::UUID);');
    this.addSql('alter table "quiz_answers" alter column "cumulative_score" type numeric using ("cumulative_score"::numeric);');
    this.addSql('alter table "quiz_answers" alter column "cumulative_score" set not null;');
    this.addSql('alter table "quiz_answers" alter column "created_at" drop default;');
    this.addSql('alter table "quiz_answers" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "quiz_answers" alter column "created_at" set not null;');
    this.addSql('alter table "quiz_answers" alter column "updated_at" drop default;');
    this.addSql('alter table "quiz_answers" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "quiz_answers" alter column "updated_at" set not null;');
    this.addSql('comment on column "quiz_answers"."quiz_id" is null;');
    this.addSql('comment on column "quiz_answers"."attribute_id" is null;');
    this.addSql('comment on column "quiz_answers"."last_answered_at" is null;');
    this.addSql('alter table "quiz_answers" add constraint "quiz_answers_quiz_id_foreign" foreign key ("quiz_id") references "quizzes" ("id") on update cascade on delete set null;');
    this.addSql('alter table "quiz_answers" add constraint "quiz_answers_attribute_id_foreign" foreign key ("attribute_id") references "attributes" ("id") on update cascade on delete set null;');
    this.addSql('comment on table "quiz_answers" is \'\';');

    this.addSql('alter table "users_attributes" alter column "created_at" drop default;');
    this.addSql('alter table "users_attributes" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "users_attributes" alter column "created_at" set not null;');
    this.addSql('alter table "users_attributes" alter column "updated_at" drop default;');
    this.addSql('alter table "users_attributes" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "users_attributes" alter column "updated_at" set not null;');
    this.addSql('alter table "users_attributes" add constraint "users_attributes_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "users_attributes" add constraint "users_attributes_attribute_id_foreign" foreign key ("attribute_id") references "attributes" ("id") on update cascade;');
    this.addSql('comment on table "users_attributes" is \'\';');

    this.addSql('alter table "users_blocked_users" alter column "created_at" drop default;');
    this.addSql('alter table "users_blocked_users" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "users_blocked_users" alter column "created_at" set not null;');
    this.addSql('alter table "users_blocked_users" add constraint "users_blocked_users_blocker_id_foreign" foreign key ("blocker_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "users_blocked_users" add constraint "users_blocked_users_blocked_id_foreign" foreign key ("blocked_id") references "users" ("id") on update cascade;');
    this.addSql('comment on table "users_blocked_users" is \'\';');

    this.addSql('alter table "users_cards" alter column "is_dismissed" type boolean using ("is_dismissed"::boolean);');
    this.addSql('alter table "users_cards" alter column "is_dismissed" set not null;');
    this.addSql('alter table "users_cards" alter column "created_at" drop default;');
    this.addSql('alter table "users_cards" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "users_cards" alter column "created_at" set not null;');
    this.addSql('alter table "users_cards" alter column "updated_at" drop default;');
    this.addSql('alter table "users_cards" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "users_cards" alter column "updated_at" set not null;');
    this.addSql('alter table "users_cards" add constraint "users_cards_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "users_cards" add constraint "users_cards_card_id_foreign" foreign key ("card_id") references "cards" ("id") on update cascade;');
    this.addSql('comment on table "users_cards" is \'\';');

    this.addSql('alter table "users_pinned_friends" alter column "created_at" drop default;');
    this.addSql('alter table "users_pinned_friends" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "users_pinned_friends" alter column "created_at" set not null;');
    this.addSql('alter table "users_pinned_friends" add constraint "users_pinned_friends_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "users_pinned_friends" add constraint "users_pinned_friends_pinned_friend_id_foreign" foreign key ("pinned_friend_id") references "users" ("id") on update cascade;');
    this.addSql('comment on table "users_pinned_friends" is \'\';');

    this.addSql('alter table "users_pods" alter column "created_at" drop default;');
    this.addSql('alter table "users_pods" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "users_pods" alter column "created_at" set not null;');
    this.addSql('alter table "users_pods" add constraint "users_pods_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "users_pods" add constraint "users_pods_friend_id_foreign" foreign key ("friend_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "users_pods" add constraint "users_pods_pod_id_foreign" foreign key ("pod_id") references "pods" ("id") on update cascade;');
    this.addSql('comment on table "users_pods" is \'\';');

    this.addSql('comment on column "users_previous_cities"."left_at" is null;');
    this.addSql('alter table "users_previous_cities" add constraint "users_previous_cities_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "users_previous_cities" add constraint "users_previous_cities_city_id_foreign" foreign key ("city_id") references "cities" ("id") on update cascade;');
    this.addSql('comment on table "users_previous_cities" is \'\';');

    this.addSql('comment on column "users_previous_major_cities"."left_at" is null;');
    this.addSql('alter table "users_previous_major_cities" add constraint "users_previous_major_cities_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "users_previous_major_cities" add constraint "users_previous_major_cities_major_city_id_foreign" foreign key ("major_city_id") references "cities" ("id") on update cascade;');
    this.addSql('comment on table "users_previous_major_cities" is \'\';');
  }

  async down(): Promise<void> {
    this.addSql('alter table "cards" drop constraint "cards_subject_id_foreign";');
    this.addSql('alter table "cards" drop constraint "cards_card_type_id_foreign";');

    this.addSql('alter table "cities" drop constraint "cities_major_city_id_foreign";');

    this.addSql('alter table "friend_requests" drop constraint "friend_requests_from_user_id_foreign";');
    this.addSql('alter table "friend_requests" drop constraint "friend_requests_to_user_id_foreign";');

    this.addSql('alter table "friendships" drop constraint "friendships_user_id_foreign";');
    this.addSql('alter table "friendships" drop constraint "friendships_friend_id_foreign";');

    this.addSql('alter table "invites" drop constraint "invites_inviter_id_foreign";');
    this.addSql('alter table "invites" drop constraint "invites_consumer_id_foreign";');

    this.addSql('alter table "moments" drop constraint "moments_user_id_foreign";');
    this.addSql('alter table "moments" drop constraint "moments_moment_option_id_foreign";');

    this.addSql('alter table "popups" drop constraint "popups_user_id_foreign";');

    this.addSql('alter table "quiz_answers" drop constraint "quiz_answers_quiz_id_foreign";');
    this.addSql('alter table "quiz_answers" drop constraint "quiz_answers_attribute_id_foreign";');

    this.addSql('alter table "quizzes" drop constraint "quizzes_actor_id_foreign";');
    this.addSql('alter table "quizzes" drop constraint "quizzes_subject_id_foreign";');
    this.addSql('alter table "quizzes" drop constraint "quizzes_current_quiz_card_id_foreign";');

    this.addSql('alter table "users" drop constraint "users_current_city_id_foreign";');
    this.addSql('alter table "users" drop constraint "users_current_major_city_id_foreign";');
    this.addSql('alter table "users" drop constraint "users_home_base_city_id_foreign";');
    this.addSql('alter table "users" drop constraint "users_home_base_major_city_id_foreign";');

    this.addSql('alter table "users_attributes" drop constraint "users_attributes_user_id_foreign";');
    this.addSql('alter table "users_attributes" drop constraint "users_attributes_attribute_id_foreign";');

    this.addSql('alter table "users_blocked_users" drop constraint "users_blocked_users_blocker_id_foreign";');
    this.addSql('alter table "users_blocked_users" drop constraint "users_blocked_users_blocked_id_foreign";');

    this.addSql('alter table "users_cards" drop constraint "users_cards_user_id_foreign";');
    this.addSql('alter table "users_cards" drop constraint "users_cards_card_id_foreign";');

    this.addSql('alter table "users_pinned_friends" drop constraint "users_pinned_friends_user_id_foreign";');
    this.addSql('alter table "users_pinned_friends" drop constraint "users_pinned_friends_pinned_friend_id_foreign";');

    this.addSql('alter table "users_pods" drop constraint "users_pods_user_id_foreign";');
    this.addSql('alter table "users_pods" drop constraint "users_pods_friend_id_foreign";');
    this.addSql('alter table "users_pods" drop constraint "users_pods_pod_id_foreign";');

    this.addSql('alter table "users_previous_cities" drop constraint "users_previous_cities_user_id_foreign";');
    this.addSql('alter table "users_previous_cities" drop constraint "users_previous_cities_city_id_foreign";');

    this.addSql('alter table "users_previous_major_cities" drop constraint "users_previous_major_cities_user_id_foreign";');
    this.addSql('alter table "users_previous_major_cities" drop constraint "users_previous_major_cities_major_city_id_foreign";');

    this.addSql('alter table "attributes" alter column "id" drop default;');
    this.addSql('alter table "attributes" alter column "id" type uuid using ("id"::text::uuid);');
    this.addSql('alter table "attributes" alter column "id" set default uuid_generate_v4();');
    this.addSql('alter table "attributes" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "attributes" alter column "created_at" set default now();');
    this.addSql('alter table "attributes" alter column "created_at" drop not null;');
    this.addSql('alter table "attributes" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "attributes" alter column "updated_at" set default now();');
    this.addSql('alter table "attributes" alter column "updated_at" drop not null;');
    this.addSql('comment on column "attributes"."attribute_name" is \'Renamed from `attribute` to `attribute_name`.\';');
    this.addSql('comment on column "attributes"."emoji_icon" is \'Renamed from `emojiIcon` to `emoji_icon`.\';');
    this.addSql('comment on column "attributes"."question_name" is \'Renamed from `questionName` to `question_name`.\';');
    this.addSql('comment on column "attributes"."short_name" is \'Renamed from `shortName` to `short_name`.\';');
    this.addSql('comment on column "attributes"."attribute_type" is \'Renamed from `type` to `attribute_type`.\';');

    this.addSql('alter table "card_types" alter column "id" drop default;');
    this.addSql('alter table "card_types" alter column "id" type uuid using ("id"::text::uuid);');
    this.addSql('alter table "card_types" alter column "id" set default uuid_generate_v4();');
    this.addSql('alter table "card_types" alter column "is_permanent" type bool using ("is_permanent"::bool);');
    this.addSql('alter table "card_types" alter column "is_permanent" drop not null;');
    this.addSql('alter table "card_types" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "card_types" alter column "created_at" set default now();');
    this.addSql('alter table "card_types" alter column "created_at" drop not null;');
    this.addSql('alter table "card_types" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "card_types" alter column "updated_at" set default now();');
    this.addSql('alter table "card_types" alter column "updated_at" drop not null;');
    this.addSql('comment on table "card_types" is \'Renamed from `cardType` to `card_types` to use plural table names.\';');

    this.addSql('alter table "cards" add column "is_permanent" bool null default false;');
    this.addSql('alter table "cards" alter column "id" drop default;');
    this.addSql('alter table "cards" alter column "id" type uuid using ("id"::text::uuid);');
    this.addSql('alter table "cards" alter column "id" set default uuid_generate_v4();');
    this.addSql('alter table "cards" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "cards" alter column "created_at" set default now();');
    this.addSql('alter table "cards" alter column "created_at" drop not null;');
    this.addSql('alter table "cards" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "cards" alter column "updated_at" set default now();');
    this.addSql('alter table "cards" alter column "updated_at" drop not null;');
    this.addSql('comment on column "cards"."is_permanent" is \'Renamed from `isPermanent` to `is_permanent`.\';');
    this.addSql('comment on column "cards"."subject_id" is \'Renamed from `friendID` to `subject_id` and defined as a foreign key to `users` table to establish a relation.\';');
    this.addSql('comment on column "cards"."card_type_id" is \'Renamed from `type` to `card_type_id` and established a proper relation to `card_types`.\';');
    this.addSql('alter table "cards" add constraint "cards_card_type_id_fkey" foreign key ("card_type_id") references "card_types" ("id") on update no action on delete no action;');
    this.addSql('alter table "cards" add constraint "cards_subject_id_fkey" foreign key ("subject_id") references "users" ("id") on update no action on delete no action;');
    this.addSql('comment on table "cards" is \'Table to store card information. The card_body, card_title, color, cta, and icon fields have been removed from this table and will now only live on the card_types table.\';');

    this.addSql('alter table "cities" alter column "location" type geometry using ("location"::geometry);');
    this.addSql('alter table "cities" alter column "is_major_city" type bool using ("is_major_city"::bool);');
    this.addSql('alter table "cities" alter column "is_major_city" drop not null;');
    this.addSql('alter table "cities" alter column "population" type numeric using ("population"::numeric);');
    this.addSql('alter table "cities" alter column "population" drop not null;');
    this.addSql('alter table "cities" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "cities" alter column "created_at" set default now();');
    this.addSql('alter table "cities" alter column "created_at" drop not null;');
    this.addSql('alter table "cities" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "cities" alter column "updated_at" set default now();');
    this.addSql('alter table "cities" alter column "updated_at" drop not null;');
    this.addSql('comment on column "cities"."country_code" is \'Renamed from `countryCode` to `country_code`.\';');
    this.addSql('comment on column "cities"."major_city_id" is \'Renamed from `majorCity` to `major_city_id` to indicate relation to `cities`.\';');
    this.addSql('comment on column "cities"."readable_name" is \'Renamed from `readableName` to `readable_name`.\';');
    this.addSql('alter table "cities" add constraint "cities_major_city_id_fkey" foreign key ("major_city_id") references "cities" ("id") on update no action on delete no action;');

    this.addSql('alter table "friend_requests" alter column "status" drop default;');
    this.addSql('alter table "friend_requests" alter column "status" type text using ("status"::text);');
    this.addSql('alter table "friend_requests" alter column "status" drop not null;');
    this.addSql('alter table "friend_requests" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "friend_requests" alter column "created_at" set default now();');
    this.addSql('alter table "friend_requests" alter column "created_at" drop not null;');
    this.addSql('alter table "friend_requests" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "friend_requests" alter column "updated_at" set default now();');
    this.addSql('alter table "friend_requests" alter column "updated_at" drop not null;');
    this.addSql('comment on column "friend_requests"."from_user_id" is \'User ID of the user sending the friend request. This column is populated by transforming the `pendingFriends` list in DynamoDB, associating the sender\'\'s user ID as the `from_user_id` in this table.\';');
    this.addSql('comment on column "friend_requests"."to_user_id" is \'User ID of the user receiving the friend request. This column is populated by transforming the `friendRequests` list in DynamoDB, where each entry in the list is a user ID that has sent a request to the user, and here it is stored as the `to_user_id`.\';');
    this.addSql('alter table "friend_requests" add constraint "friend_requests_from_user_id_fkey" foreign key ("from_user_id") references "users" ("id") on update no action on delete no action;');
    this.addSql('alter table "friend_requests" add constraint "friend_requests_to_user_id_fkey" foreign key ("to_user_id") references "users" ("id") on update no action on delete no action;');
    this.addSql('comment on table "friend_requests" is \'Join table for managing friend requests among users. This table represents a many-to-many relationship where one user sends a friend request to another user. `from_user_id` represents the user who initiated the friend request, and `to_user_id` represents the user who received the friend request. The `status` column represents the current status of the friend request. Data for this table is sourced from the `friendRequests` JSONB attribute in the `users` table from DynamoDB, which contains a list of user IDs representing friends that a user has received friend requests from, as well as from the `pendingFriends` JSONB attribute, which contains a list of user IDs representing the friend requests a user has sent that are awaiting response.\';');

    this.addSql('alter table "friendships" alter column "friends_since" type timestamptz using ("friends_since"::timestamptz);');
    this.addSql('alter table "friendships" alter column "friends_since" drop not null;');
    this.addSql('alter table "friendships" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "friendships" alter column "created_at" set default now();');
    this.addSql('alter table "friendships" alter column "created_at" drop not null;');
    this.addSql('alter table "friendships" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "friendships" alter column "updated_at" set default now();');
    this.addSql('alter table "friendships" alter column "updated_at" drop not null;');
    this.addSql('comment on column "friendships"."last_caught_up" is \'Renamed from `lastCaughtUp` to `last_caught_up`.\';');
    this.addSql('comment on column "friendships"."profile_unlocked_on" is \'Renamed from `profileUnlockedOn` to `profile_unlocked_on`.\';');
    this.addSql('alter table "friendships" add constraint "friendships_friend_id_fkey" foreign key ("friend_id") references "users" ("id") on update no action on delete no action;');
    this.addSql('alter table "friendships" add constraint "friendships_user_id_fkey" foreign key ("user_id") references "users" ("id") on update no action on delete no action;');
    this.addSql('comment on table "friendships" is \'Represents **unidirectional** friendship/relationship metadata between two users. Each row contains metadata for how `user_id` views their friendship with `friend_id`. Rows may exist in pairs to reflect each user\'\'s perspective in a friendship relation. Data is sourced from the DynamoDB `users_friendshipMetadata` table, with `user_id` and `friend_id` derived from splitting the `id` field of the DynamoDB table. For example, an `id` value of `d72592c6-a0c5-4ae3-89eb-676fd887a765_e7750657-5625-46e4-8f8b-434c7d9d8dcf` would be transformed into `user_id` being `d72592c6-a0c5-4ae3-89eb-676fd887a765` and `friend_id` being `e7750657-5625-46e4-8f8b-434c7d9d8dcf`.\';');

    this.addSql('alter table "invites" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "invites" alter column "created_at" set default now();');
    this.addSql('alter table "invites" alter column "created_at" drop not null;');
    this.addSql('alter table "invites" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "invites" alter column "updated_at" set default now();');
    this.addSql('alter table "invites" alter column "updated_at" drop not null;');
    this.addSql('comment on column "invites"."id" is \'The invite code, represented as TEXT, serves as the primary key. This field stores the invite code from the `id` field of DynamoDB items.\';');
    this.addSql('comment on column "invites"."inviter_id" is \'Rename from `user` on the original DynamoDB object. A UUID referencing the user who created the invite. It establishes a foreign key relationship to the `users` table, identifying the inviter.\';');
    this.addSql('comment on column "invites"."consumer_id" is \'A UUID referencing the user who used this invite code to sign up. Establishes a foreign key relationship to the `users` table, indicating the consumer of the invite code. When migrating data from DynamoDB, map the incoming `users` table\'\'s `invites` field where each key-value pair has the format: the key is the invite code (matching the `id` field in this table) and the value is the consumer\'\'s user ID, here represented as `consumer_id`.\';');
    this.addSql('alter table "invites" add constraint "invites_consumer_id_fkey" foreign key ("consumer_id") references "users" ("id") on update no action on delete no action;');
    this.addSql('alter table "invites" add constraint "invites_inviter_id_fkey" foreign key ("inviter_id") references "users" ("id") on update no action on delete no action;');
    this.addSql('comment on table "invites" is \'Table to store invite codes. Each invite code is unique and identifies an invitation sent by an existing user (`inviter_id`) to a new user (`consumer_id`).\';');

    this.addSql('alter table "moment_options" alter column "id" drop default;');
    this.addSql('alter table "moment_options" alter column "id" type uuid using ("id"::text::uuid);');
    this.addSql('alter table "moment_options" alter column "id" set default uuid_generate_v4();');
    this.addSql('alter table "moment_options" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "moment_options" alter column "created_at" set default now();');
    this.addSql('alter table "moment_options" alter column "created_at" drop not null;');
    this.addSql('alter table "moment_options" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "moment_options" alter column "updated_at" set default now();');
    this.addSql('alter table "moment_options" alter column "updated_at" drop not null;');
    this.addSql('comment on column "moment_options"."more_information" is \'Renamed from `moreInformation` to `more_information`.\';');
    this.addSql('comment on column "moment_options"."option_name" is \'Renamed from `name` to `option_name`.\';');

    this.addSql('alter table "moments" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "moments" alter column "created_at" set default now();');
    this.addSql('alter table "moments" alter column "created_at" drop not null;');
    this.addSql('alter table "moments" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "moments" alter column "updated_at" set default now();');
    this.addSql('alter table "moments" alter column "updated_at" drop not null;');
    this.addSql('comment on column "moments"."id" is \'Derived from the latter part of the concatenated `id` field in DynamoDB, representing the moment.\';');
    this.addSql('comment on column "moments"."user_id" is \'Derived from the former part of the concatenated `id` field in DynamoDB, representing the user.\';');
    this.addSql('comment on column "moments"."moment_option_id" is \'Sourced from `momentOptionID` in DynamoDB.\';');
    this.addSql('alter table "moments" add constraint "moments_moment_option_id_fkey" foreign key ("moment_option_id") references "moment_options" ("id") on update no action on delete no action;');
    this.addSql('alter table "moments" add constraint "moments_user_id_fkey" foreign key ("user_id") references "users" ("id") on update no action on delete no action;');
    this.addSql('comment on table "moments" is \'Derived from the DynamoDB table `users_moments`.\';');

    this.addSql('alter table "pods" alter column "id" drop default;');
    this.addSql('alter table "pods" alter column "id" type uuid using ("id"::text::uuid);');
    this.addSql('alter table "pods" alter column "id" set default uuid_generate_v4();');
    this.addSql('alter table "pods" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "pods" alter column "created_at" set default now();');
    this.addSql('alter table "pods" alter column "created_at" drop not null;');
    this.addSql('alter table "pods" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "pods" alter column "updated_at" set default now();');
    this.addSql('alter table "pods" alter column "updated_at" drop not null;');
    this.addSql('comment on column "pods"."emoji_icon" is \'Renamed from `emojiIcon` to `emoji_icon`.\';');
    this.addSql('comment on column "pods"."pod_name" is \'Renamed from `name` to `pod_name`.\';');

    this.addSql('alter table "popups" alter column "id" drop default;');
    this.addSql('alter table "popups" alter column "id" type uuid using ("id"::text::uuid);');
    this.addSql('alter table "popups" alter column "id" set default uuid_generate_v4();');
    this.addSql('alter table "popups" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "popups" alter column "created_at" set default now();');
    this.addSql('alter table "popups" alter column "created_at" drop not null;');
    this.addSql('alter table "popups" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "popups" alter column "updated_at" set default now();');
    this.addSql('alter table "popups" alter column "updated_at" drop not null;');
    this.addSql('comment on column "popups"."user_id" is \'Represents the ID of the user associated with this popup, extracted as the `user_id` part from the concatenated primary key in the format `<user_id>_<popup_id>`.\';');
    this.addSql('comment on column "popups"."popup_name" is \'Renamed from `name` to `popup_name` to avoid reserved keyword.\';');
    this.addSql('comment on column "popups"."popup_type" is \'Renamed from `type` to `popup_type` to avoid reserved keyword.\';');
    this.addSql('comment on column "popups"."started_at" is \'Renamed from `startedAt` to `started_at` to follow PostgreSQL naming conventions.\';');
    this.addSql('comment on column "popups"."ended_early_at" is \'Renamed from `endedEarlyAt` to `ended_early_at` to follow PostgreSQL naming conventions.\';');
    this.addSql('comment on column "popups"."expired_at" is \'Renamed from `expiredAt` to `expired_at` to follow PostgreSQL naming conventions.\';');
    this.addSql('alter table "popups" add constraint "popups_user_id_fkey" foreign key ("user_id") references "users" ("id") on update no action on delete no action;');
    this.addSql('comment on table "popups" is \'Table to store popup information, reflecting the 1:n relationship from users to popups. Each popup is unique to a user and is not shared across users. This schema change addresses the incorrect implementation in DynamoDB as a join table. Data for this table is sourced from the DynamoDB `users_popups` join table. The `id` value is constructed by extracting the `popup_id` part from the concatenated primary key in the format `<user_id>_<popup_id>`.\';');

    this.addSql('alter table "quiz_answers" alter column "id" drop default;');
    this.addSql('alter table "quiz_answers" alter column "id" type uuid using ("id"::text::uuid);');
    this.addSql('alter table "quiz_answers" alter column "id" set default uuid_generate_v4();');
    this.addSql('alter table "quiz_answers" alter column "cumulative_score" type numeric using ("cumulative_score"::numeric);');
    this.addSql('alter table "quiz_answers" alter column "cumulative_score" drop not null;');
    this.addSql('alter table "quiz_answers" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "quiz_answers" alter column "created_at" set default now();');
    this.addSql('alter table "quiz_answers" alter column "created_at" drop not null;');
    this.addSql('alter table "quiz_answers" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "quiz_answers" alter column "updated_at" set default now();');
    this.addSql('alter table "quiz_answers" alter column "updated_at" drop not null;');
    this.addSql('comment on column "quiz_answers"."quiz_id" is \'ID of the quiz the answer belongs to.\';');
    this.addSql('comment on column "quiz_answers"."attribute_id" is \'ID of the attribute the answer is about. This is sourced from the `users_quizNotes` table in DynamoDB. The `attribute_id` is actually being stored as column names in DynamoDB (but without the hyphens), so this column is populated by transforming the column names into attribute IDs\';');
    this.addSql('comment on column "quiz_answers"."last_answered_at" is \'This is sourced from the `lastQuizAt` value stored within the JSON object that\'\'s the value of each of those weird columns whose names are attribute IDs without the hyphens.\';');
    this.addSql('alter table "quiz_answers" add constraint "quiz_answers_attribute_id_fkey" foreign key ("attribute_id") references "attributes" ("id") on update no action on delete no action;');
    this.addSql('alter table "quiz_answers" add constraint "quiz_answers_quiz_id_fkey" foreign key ("quiz_id") references "quizzes" ("id") on update no action on delete no action;');
    this.addSql('comment on table "quiz_answers" is \'Table to store the answers for each quiz. Each answer is associated with a quiz and an attribute.\';');

    this.addSql('alter table "quizzes" alter column "id" drop default;');
    this.addSql('alter table "quizzes" alter column "id" type uuid using ("id"::text::uuid);');
    this.addSql('alter table "quizzes" alter column "id" set default uuid_generate_v4();');
    this.addSql('alter table "quizzes" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "quizzes" alter column "created_at" set default now();');
    this.addSql('alter table "quizzes" alter column "created_at" drop not null;');
    this.addSql('alter table "quizzes" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "quizzes" alter column "updated_at" set default now();');
    this.addSql('alter table "quizzes" alter column "updated_at" drop not null;');
    this.addSql('comment on column "quizzes"."actor_id" is \'ID of the user taking the quiz. This is derived from the `id` field in DynamoDB, which is a composite primary key in the format `<actor_id>_<subject_id>`. The `actor_id` is the first part of this key.\';');
    this.addSql('comment on column "quizzes"."subject_id" is \'ID of the user that the quiz is about. This is derived from the `id` field in DynamoDB, which is a composite primary key in the format `<actor_id>_<subject_id>`. The `subject_id` is the second part of this key.\';');
    this.addSql('comment on column "quizzes"."current_quiz_card_id" is \'Relation with the `cards` table.\';');
    this.addSql('comment on column "quizzes"."last_actor_quiz_at" is \'Timestamp of the last quiz taken by the actor.\';');
    this.addSql('alter table "quizzes" add constraint "quizzes_actor_id_fkey" foreign key ("actor_id") references "users" ("id") on update no action on delete no action;');
    this.addSql('alter table "quizzes" add constraint "quizzes_current_quiz_card_id_fkey" foreign key ("current_quiz_card_id") references "cards" ("id") on update no action on delete no action;');
    this.addSql('alter table "quizzes" add constraint "quizzes_subject_id_fkey" foreign key ("subject_id") references "users" ("id") on update no action on delete no action;');
    this.addSql('comment on table "quizzes" is \'Table to store quiz information. Each quiz is unique to a pair of users (actor and subject). Data for this table is sourced from the DynamoDB `users_quizNotes` join table.\';');

    this.addSql('alter table "users" alter column "id" drop default;');
    this.addSql('alter table "users" alter column "id" type uuid using ("id"::text::uuid);');
    this.addSql('alter table "users" alter column "id" set default uuid_generate_v4();');
    this.addSql('alter table "users" alter column "count_attribute" type numeric using ("count_attribute"::numeric);');
    this.addSql('alter table "users" alter column "count_attribute" drop not null;');
    this.addSql('alter table "users" alter column "count_quiz" type numeric using ("count_quiz"::numeric);');
    this.addSql('alter table "users" alter column "count_quiz" drop not null;');
    this.addSql('alter table "users" alter column "is_full_user" type bool using ("is_full_user"::bool);');
    this.addSql('alter table "users" alter column "is_full_user" drop not null;');
    this.addSql('alter table "users" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "users" alter column "created_at" set default now();');
    this.addSql('alter table "users" alter column "created_at" drop not null;');
    this.addSql('alter table "users" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "users" alter column "updated_at" set default now();');
    this.addSql('alter table "users" alter column "updated_at" drop not null;');
    this.addSql('comment on column "users"."country_code" is \'Renamed from `countryCode` to `country_code`.\';');
    this.addSql('comment on column "users"."current_city_id" is \'Renamed from `currentCity` to `current_city_id` and defined as a foreign key to `cities` table to establish a relation.\';');
    this.addSql('comment on column "users"."current_major_city_id" is \'Renamed from `currentMajorCity` to `current_major_city_id` and defined as a foreign key to `cities` table to establish a relation.\';');
    this.addSql('comment on column "users"."date_of_birth" is \'Converted from TEXT to DATE, renamed from `dateOfBirth` to `date_of_birth`.\';');
    this.addSql('comment on column "users"."home_base_city_id" is \'Renamed from `homeBaseCity` to `home_base_city_id` and defined as a foreign key to `cities` table to establish a relation.\';');
    this.addSql('comment on column "users"."home_base_major_city_id" is \'Renamed from `homeBaseMajorCity` to `home_base_major_city_id` and defined as a foreign key to `cities` table to establish a relation.\';');
    this.addSql('alter table "users" add constraint "users_current_city_id_fkey" foreign key ("current_city_id") references "cities" ("id") on update no action on delete no action;');
    this.addSql('alter table "users" add constraint "users_current_major_city_id_fkey" foreign key ("current_major_city_id") references "cities" ("id") on update no action on delete no action;');
    this.addSql('alter table "users" add constraint "users_home_base_city_id_fkey" foreign key ("home_base_city_id") references "cities" ("id") on update no action on delete no action;');
    this.addSql('alter table "users" add constraint "users_home_base_major_city_id_fkey" foreign key ("home_base_major_city_id") references "cities" ("id") on update no action on delete no action;');

    this.addSql('alter table "users_attributes" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "users_attributes" alter column "created_at" set default now();');
    this.addSql('alter table "users_attributes" alter column "created_at" drop not null;');
    this.addSql('alter table "users_attributes" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "users_attributes" alter column "updated_at" set default now();');
    this.addSql('alter table "users_attributes" alter column "updated_at" drop not null;');
    this.addSql('alter table "users_attributes" add constraint "users_attributes_attribute_id_fkey" foreign key ("attribute_id") references "attributes" ("id") on update no action on delete no action;');
    this.addSql('alter table "users_attributes" add constraint "users_attributes_user_id_fkey" foreign key ("user_id") references "users" ("id") on update no action on delete no action;');
    this.addSql('comment on table "users_attributes" is \'Join table to represent the many-to-many relationship between users and attributes, with an additional column `answer` for storing user responses. Data originates from `attributes` field in `users` table in DynamoDB, which is a JSON object with attribute IDs as keys and user\'\'s answers as values.\';');

    this.addSql('alter table "users_blocked_users" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "users_blocked_users" alter column "created_at" set default now();');
    this.addSql('alter table "users_blocked_users" alter column "created_at" drop not null;');
    this.addSql('alter table "users_blocked_users" add constraint "users_blocked_users_blocked_id_fkey" foreign key ("blocked_id") references "users" ("id") on update no action on delete no action;');
    this.addSql('alter table "users_blocked_users" add constraint "users_blocked_users_blocker_id_fkey" foreign key ("blocker_id") references "users" ("id") on update no action on delete no action;');
    this.addSql('comment on table "users_blocked_users" is \'Join table to manage the many-to-many relationship of users blocking other users. Populated from the `blockedUsers` field in the `users` table in DynamoDB, which contains a list of user IDs that a user has blocked.\';');

    this.addSql('alter table "users_cards" alter column "is_dismissed" type bool using ("is_dismissed"::bool);');
    this.addSql('alter table "users_cards" alter column "is_dismissed" drop not null;');
    this.addSql('alter table "users_cards" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "users_cards" alter column "created_at" set default now();');
    this.addSql('alter table "users_cards" alter column "created_at" drop not null;');
    this.addSql('alter table "users_cards" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "users_cards" alter column "updated_at" set default now();');
    this.addSql('alter table "users_cards" alter column "updated_at" drop not null;');
    this.addSql('alter table "users_cards" add constraint "users_cards_card_id_fkey" foreign key ("card_id") references "cards" ("id") on update no action on delete no action;');
    this.addSql('alter table "users_cards" add constraint "users_cards_user_id_fkey" foreign key ("user_id") references "users" ("id") on update no action on delete no action;');
    this.addSql('comment on table "users_cards" is \'Join table for the many-to-many relationship between users and their cards. Data for this table is sourced from `activeCards` field in `users` table from DynamoDB, which contains a list of card IDs.\';');

    this.addSql('alter table "users_pinned_friends" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "users_pinned_friends" alter column "created_at" set default now();');
    this.addSql('alter table "users_pinned_friends" alter column "created_at" drop not null;');
    this.addSql('alter table "users_pinned_friends" add constraint "users_pinned_friends_pinned_friend_id_fkey" foreign key ("pinned_friend_id") references "users" ("id") on update no action on delete no action;');
    this.addSql('alter table "users_pinned_friends" add constraint "users_pinned_friends_user_id_fkey" foreign key ("user_id") references "users" ("id") on update no action on delete no action;');
    this.addSql('comment on table "users_pinned_friends" is \'Join table for managing pinned friends, representing a many-to-many relationship between users and their pinned friends. Based on the `pinnedFriends` field in the `users` table in DynamoDB, which includes a list of user IDs prefixed by "favs/"\';');

    this.addSql('alter table "users_pods" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "users_pods" alter column "created_at" set default now();');
    this.addSql('alter table "users_pods" alter column "created_at" drop not null;');
    this.addSql('alter table "users_pods" add constraint "users_pods_friend_id_fkey" foreign key ("friend_id") references "users" ("id") on update no action on delete no action;');
    this.addSql('alter table "users_pods" add constraint "users_pods_pod_id_fkey" foreign key ("pod_id") references "pods" ("id") on update no action on delete no action;');
    this.addSql('alter table "users_pods" add constraint "users_pods_user_id_fkey" foreign key ("user_id") references "users" ("id") on update no action on delete no action;');
    this.addSql('comment on table "users_pods" is \'Join table to store pods data specific to each friendship from `user_id`\'\'s perspective. A pod is a labeled group of friends, and each record indicates that `friend_id` is part of a pod according to `user_id`. Data is sourced from the `pods` attribute of the DynamoDB `users_friendshipMetadata` table.\';');

    this.addSql('comment on column "users_previous_cities"."left_at" is \'Renamed from `timeLeft` to `left_at`.\';');
    this.addSql('alter table "users_previous_cities" add constraint "users_previous_cities_city_id_fkey" foreign key ("city_id") references "cities" ("id") on update no action on delete no action;');
    this.addSql('alter table "users_previous_cities" add constraint "users_previous_cities_user_id_fkey" foreign key ("user_id") references "users" ("id") on update no action on delete no action;');
    this.addSql('comment on table "users_previous_cities" is \'Join table for representing the previous cities a user has lived in, along with the time they left the city. Data sourced from the `previousCities` field in the `users` table in DynamoDB, a JSON list with each object containing a `location` field (city ID) and a `time_left` field.\';');

    this.addSql('comment on column "users_previous_major_cities"."left_at" is \'Renamed from `timeLeft` to `left_at`.\';');
    this.addSql('alter table "users_previous_major_cities" add constraint "users_previous_major_cities_major_city_id_fkey" foreign key ("major_city_id") references "cities" ("id") on update no action on delete no action;');
    this.addSql('alter table "users_previous_major_cities" add constraint "users_previous_major_cities_user_id_fkey" foreign key ("user_id") references "users" ("id") on update no action on delete no action;');
    this.addSql('comment on table "users_previous_major_cities" is \'Join table for representing the previous major cities a user has lived in, with a timestampTZ indicating when they left. Derived from the `previousMajorCities` field in the `users` table in DynamoDB, similar to `previousCities` but for major cities.\';');
  }

}
