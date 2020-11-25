export const databaseCFG = {
    user: process.env.DBUSER ? process.env.DBUSER : 'dbusr', // process.env.USER
    host: process.env.DBHOST ? process.env.DBHOST : 'localhost',
    password: process.env.DBPASS ? process.env.DBPASS : 'dbpass',
    name: process.env.DBNAME ? process.env.DBNAME : 'dbname', // process.env.USER
    port: 5432,
    createSchema: true
};