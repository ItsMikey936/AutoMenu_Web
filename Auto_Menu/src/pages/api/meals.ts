import { db } from '../../lib/db';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const ingredientes = await db.execute('SELECT * FROM ingredientes');
  return new Response(JSON.stringify(ingredientes.rows), {
    headers: { 'Content-Type': 'application/json' },
  });
};
