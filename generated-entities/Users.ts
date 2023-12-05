import { Collection, Entity, ManyToMany, ManyToOne, OptionalProps, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { Cards } from './Cards';
import { Cities } from './Cities';

@Entity()
export class Users {

  [OptionalProps]?: 'id';

  @PrimaryKey({ columnType: 'uuid', defaultRaw: `uuid_generate_v4()` })
  id!: string;

  @Property({ columnType: 'numeric(10,0)', nullable: true, defaultRaw: `0` })
  countAttribute?: string;

  @Property({ columnType: 'numeric(10,0)', nullable: true, defaultRaw: `0` })
  countQuiz?: string;

  @Property({ nullable: true })
  countryCode?: string;

  @ManyToOne({ entity: () => Cities, nullable: true })
  currentCity?: Cities;

  @ManyToOne({ entity: () => Cities, nullable: true })
  currentMajorCity?: Cities;

  @Property({ columnType: 'date', nullable: true })
  dateOfBirth?: string;

  @Property({ nullable: true })
  expoPushToken?: string;

  @Property({ nullable: true })
  firstName?: string;

  @ManyToOne({ entity: () => Cities, nullable: true })
  homeBaseCity?: Cities;

  @ManyToOne({ entity: () => Cities, nullable: true })
  homeBaseMajorCity?: Cities;

  @Property({ nullable: true })
  lastName?: string;

  @Unique({ name: 'users_phone_number_key' })
  @Property({ nullable: true })
  phoneNumber?: string;

  @Property({ nullable: true })
  profilePictureKey?: string;

  @Property({ nullable: true })
  socials?: any;

  @Property({ length: 6, nullable: true, defaultRaw: `now()` })
  createdAt?: Date;

  @Property({ length: 6, nullable: true, defaultRaw: `now()` })
  updatedAt?: Date;

  @Property({ nullable: true, default: false })
  isFullUser?: boolean = false;

  @Unique({ name: 'users_username_key' })
  @Property({ nullable: true })
  username?: string;

  @ManyToMany({ entity: () => Cards, joinColumn: 'user_id', inverseJoinColumn: 'card_id' })
  activeCards = new Collection<Cards>(this);

}
