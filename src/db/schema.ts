import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const generations = pgTable("generations", {
  id: serial("id").primaryKey(),
  originalText: text("original_text").notNull(),
  polishedText: text("polished_text").notNull(),
  tone: varchar("tone", { length: 50 }).notNull(), 
  createdAt: timestamp("created_at").defaultNow().notNull(),
});