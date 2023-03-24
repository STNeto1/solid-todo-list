import {
  serial,
  text,
  timestamp,
  varchar
} from 'drizzle-orm/mysql-core/columns'
import { mysqlTable } from 'drizzle-orm/mysql-core/table'

export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', {
    length: 256
  }).notNull(),
  password: text('password').notNull(),
  created_at: timestamp('created_at').notNull().defaultNow()
})
