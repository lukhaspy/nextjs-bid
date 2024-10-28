import { mysqlTable, serial } from "drizzle-orm/mysql-core";

export const bids = mysqlTable("bids", {
  id: serial("id").primaryKey(),
});
