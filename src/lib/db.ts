import * as dotenv from 'dotenv';
dotenv.config();

import { createClient } from '@libsql/client';
import { LibsqlDialect } from '@libsql/kysely-libsql';
import { Kysely } from 'kysely';
import type { Database } from './schema';

const dbUrl = process.env.TURSO_DB_URL;
const dbToken = process.env.TURSO_DB_TOKEN;

if (!dbUrl || !dbToken) {
  throw new Error('Faltan las variables de entorno TURSO_DB_URL o TURSO_DB_TOKEN');
}

const client = createClient({
  url: dbUrl,
  authToken: dbToken,
});

export const db = new Kysely<Database>({
  dialect: new LibsqlDialect({ client }),
});

console.log('DB URL:', dbUrl);
console.log('DB TOKEN:', dbToken);