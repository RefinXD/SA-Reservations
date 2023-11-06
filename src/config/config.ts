/* eslint-disable @typescript-eslint/no-unused-vars */
import * as dotenv from 'dotenv';
export default () => ({
  port: parseInt(process.env.PORT, 10) || 3002,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5433,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
  },
});
