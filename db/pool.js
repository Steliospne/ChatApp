const { Pool } = require("pg");
require("dotenv").config();

const user =
  process.env.DEV_ENV === "1"
    ? process.env.DB_USER_LOCAL
    : process.env.DB_USER_REMOTE;
const secret =
  process.env.DEV_ENV === "1"
    ? process.env.DB_SECRET_LOCAL
    : process.env.DB_SECRET_REMOTE;
const host =
  process.env.DEV_ENV === "1"
    ? process.env.DB_HOST_LOCAL
    : process.env.DB_HOST_REMOTE;
const dbName = process.env.DEV_ENV === "1" ? "chatapp" : "koyebdb";

module.exports = new Pool({
  connectionString: `postgresgl://${user}:${secret}@${host}/${dbName}`,
});
