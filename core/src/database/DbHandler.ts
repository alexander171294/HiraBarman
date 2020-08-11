import { environment } from "../env/environment";

const { Pool, Client } = require('pg')

export class DBHandler {
    private static pool;

    public static connectDB() {
        const dbCFG = {
            user: environment.pgUser,
            host: environment.pgHost,
            database: environment.pgDb,
            password: environment.pgPassword,
            port: environment.pgPort,
        };
        console.log('Connecting to db using: ', dbCFG);
        this.pool = new Pool(dbCFG);
    }

    public static getConnection() {
        return this.pool;
    }
}