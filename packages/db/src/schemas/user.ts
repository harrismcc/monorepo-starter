import { pgTable, varchar, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  username: varchar({ length: 255 }).unique(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
