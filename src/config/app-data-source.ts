import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "task",
    entities: [
        User,
    ],
    migrations: ["src/config/migrations/**/*.ts"],
    subscribers: ['src/config/subscribers/**/*.ts'],
    synchronize: true,
    migrationsRun: true,
    logging: false,
    // timezone: 'Z',
    // cli: {
    //     migrationsDir: "src/config/migrations"
    // },
})