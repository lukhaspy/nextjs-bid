// lib/db.js
import { env } from "@/env"; // Adjust the import according to your env configuration
import * as schema from "./schema"; // Adjust based on your schema location
import { MySql2Database, drizzle } from "drizzle-orm/mysql2"; // Use MySQL2
import mysql from "mysql2/promise";

declare global {
  var database: MySql2Database<typeof schema> | undefined; // Use MySQL2 type
}

let database: MySql2Database<typeof schema>;
let pool: ReturnType<typeof mysql.createPool>;

if (env.NODE_ENV === "production") {
  pool = mysql.createPool(env.DATABASE_URL);
  database = drizzle(pool);
} else {
  if (!global.database) {
    pool = mysql.createPool(env.DATABASE_URL);
    global.database = drizzle(pool);
  }

  database = global.database;
}

export { database, pool };
