import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1734529187133 implements MigrationInterface {
    name = 'InitialMigration1734529187133'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."articles_status_enum" AS ENUM('DRAFT', 'PUBLISHED')`);
        await queryRunner.query(`CREATE TABLE "articles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "content" text NOT NULL, "summary" text NOT NULL, "image_url" character varying, "status" "public"."articles_status_enum" NOT NULL DEFAULT 'DRAFT', "published_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "author_id" uuid NOT NULL, CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."event_participants_status_enum" AS ENUM('REGISTERED', 'ATTENDED', 'CANCELLED')`);
        await queryRunner.query(`CREATE TABLE "event_participants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."event_participants_status_enum" NOT NULL DEFAULT 'REGISTERED', "registration_date" TIMESTAMP NOT NULL DEFAULT now(), "event_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_b65ffd558d76fd51baffe81d42b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."events_status_enum" AS ENUM('UPCOMING', 'ONGOING', 'COMPLETED')`);
        await queryRunner.query(`CREATE TABLE "events" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text NOT NULL, "image_url" character varying, "location" character varying NOT NULL, "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, "max_participants" integer NOT NULL, "status" "public"."events_status_enum" NOT NULL DEFAULT 'UPCOMING', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "organizer_id" uuid NOT NULL, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."campaigns_status_enum" AS ENUM('ACTIVE', 'COMPLETED', 'CANCELLED')`);
        await queryRunner.query(`CREATE TABLE "campaigns" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text NOT NULL, "goal_amount" numeric(10,2) NOT NULL, "current_amount" numeric(10,2) NOT NULL DEFAULT '0', "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, "image_url" character varying, "status" "public"."campaigns_status_enum" NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_831e3fcd4fc45b4e4c3f57a9ee4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."donations_status_enum" AS ENUM('PENDING', 'COMPLETED', 'FAILED')`);
        await queryRunner.query(`CREATE TABLE "donations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" numeric(10,2) NOT NULL, "status" "public"."donations_status_enum" NOT NULL DEFAULT 'PENDING', "payment_method" character varying NOT NULL, "transaction_id" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "donor_id" uuid, "campaign_id" uuid NOT NULL, CONSTRAINT "PK_c01355d6f6f50fc6d1b4a946abf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."volunteers_status_enum" AS ENUM('ACTIVE', 'INACTIVE')`);
        await queryRunner.query(`CREATE TABLE "volunteers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "skills" text NOT NULL, "availability" json NOT NULL, "areas_of_interest" text NOT NULL, "experience_level" character varying NOT NULL, "status" "public"."volunteers_status_enum" NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, CONSTRAINT "PK_f4e65e37cf47256e3f580ecee62" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "gallery" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text NOT NULL, "image_url" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "event_id" uuid, "uploaded_by_id" character varying NOT NULL, "uploaded_by" uuid, CONSTRAINT "PK_65d7a1ef91ddafb3e7071b188a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('ADMIN', 'USER', 'VOLUNTEER')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password_hash" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER', "profile_image" character varying, "phone_number" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."newsletter_subscribers_status_enum" AS ENUM('ACTIVE', 'UNSUBSCRIBED')`);
        await queryRunner.query(`CREATE TABLE "newsletter_subscribers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "status" "public"."newsletter_subscribers_status_enum" NOT NULL DEFAULT 'ACTIVE', "subscribed_at" TIMESTAMP NOT NULL DEFAULT now(), "unsubscribed_at" TIMESTAMP, CONSTRAINT "UQ_0dc48416511f011f7de7b2a8f83" UNIQUE ("email"), CONSTRAINT "PK_38f9333e9961b2fdb589128d19b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."contacts_status_enum" AS ENUM('NEW', 'READ', 'REPLIED')`);
        await queryRunner.query(`CREATE TABLE "contacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "subject" character varying NOT NULL, "message" text NOT NULL, "status" "public"."contacts_status_enum" NOT NULL DEFAULT 'NEW', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_6515da4dff8db423ce4eb841490" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event_participants" ADD CONSTRAINT "FK_b5349807aae71193d0cc0f52e35" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event_participants" ADD CONSTRAINT "FK_ce3f433e47fdd8f072964293c8d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_14c9ce53a2c2a1c781b8390123e" FOREIGN KEY ("organizer_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "donations" ADD CONSTRAINT "FK_6d627a82b263d4ad02bd2255930" FOREIGN KEY ("donor_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "donations" ADD CONSTRAINT "FK_6ad4405f42816956aa8a89bc9fb" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "volunteers" ADD CONSTRAINT "FK_b476166961c3d8f8f22198f88e6" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "gallery" ADD CONSTRAINT "FK_1078e78807d54efa1f5fe1626d9" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "gallery" ADD CONSTRAINT "FK_b68068ae311db67122e3aa7c875" FOREIGN KEY ("uploaded_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gallery" DROP CONSTRAINT "FK_b68068ae311db67122e3aa7c875"`);
        await queryRunner.query(`ALTER TABLE "gallery" DROP CONSTRAINT "FK_1078e78807d54efa1f5fe1626d9"`);
        await queryRunner.query(`ALTER TABLE "volunteers" DROP CONSTRAINT "FK_b476166961c3d8f8f22198f88e6"`);
        await queryRunner.query(`ALTER TABLE "donations" DROP CONSTRAINT "FK_6ad4405f42816956aa8a89bc9fb"`);
        await queryRunner.query(`ALTER TABLE "donations" DROP CONSTRAINT "FK_6d627a82b263d4ad02bd2255930"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_14c9ce53a2c2a1c781b8390123e"`);
        await queryRunner.query(`ALTER TABLE "event_participants" DROP CONSTRAINT "FK_ce3f433e47fdd8f072964293c8d"`);
        await queryRunner.query(`ALTER TABLE "event_participants" DROP CONSTRAINT "FK_b5349807aae71193d0cc0f52e35"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_6515da4dff8db423ce4eb841490"`);
        await queryRunner.query(`DROP TABLE "contacts"`);
        await queryRunner.query(`DROP TYPE "public"."contacts_status_enum"`);
        await queryRunner.query(`DROP TABLE "newsletter_subscribers"`);
        await queryRunner.query(`DROP TYPE "public"."newsletter_subscribers_status_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "gallery"`);
        await queryRunner.query(`DROP TABLE "volunteers"`);
        await queryRunner.query(`DROP TYPE "public"."volunteers_status_enum"`);
        await queryRunner.query(`DROP TABLE "donations"`);
        await queryRunner.query(`DROP TYPE "public"."donations_status_enum"`);
        await queryRunner.query(`DROP TABLE "campaigns"`);
        await queryRunner.query(`DROP TYPE "public"."campaigns_status_enum"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TYPE "public"."events_status_enum"`);
        await queryRunner.query(`DROP TABLE "event_participants"`);
        await queryRunner.query(`DROP TYPE "public"."event_participants_status_enum"`);
        await queryRunner.query(`DROP TABLE "articles"`);
        await queryRunner.query(`DROP TYPE "public"."articles_status_enum"`);
    }

}
