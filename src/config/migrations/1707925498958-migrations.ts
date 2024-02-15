import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1707925498958 implements MigrationInterface {
    name = 'Migrations1707925498958'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "gender" character varying NOT NULL, "phoneNo" character varying NOT NULL, "dob" character varying NOT NULL, "address" text, "refreshToken" text, "isLogin" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
