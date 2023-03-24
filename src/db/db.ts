import { connect } from '@planetscale/database'
import { drizzle } from 'drizzle-orm/planetscale-serverless'

const connection = connect({
  host: 'aws.connect.psdb.cloud',
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD
})

export const db = drizzle(connection, {
  logger: true
})
