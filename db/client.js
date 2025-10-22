import pg from "pg";
const db = new pg.Client(process.env.DATABASE_URL);
export default db;

//this is my database connection, url defined in my .env file and read above. notice it exports so other files can use this connection