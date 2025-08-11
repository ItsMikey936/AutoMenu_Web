import { createClient } from '@libsql/client';
import * as dotenv from 'dotenv';
dotenv.config();



export default createClient({
  url: process.env.TURSO_DB_URL!,
  authToken: process.env.TURSO_DB_TOKEN!,
});