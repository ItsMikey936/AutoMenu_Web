import type { APIRoute } from "astro"
import { createClient } from "@libsql/client"
import { config } from "dotenv"
config()



const db = createClient({
  url: process.env.TURSO_DB_URL!,
  authToken: process.env.TURSO_DB_TOKEN!,
})

export const GET: APIRoute = async () => {
  try {
    const result = await db.execute(`
      SELECT 
        i.ingredient_ID,
        i.nombre_Ingrediente,
        i.unidad_Ingrediente,
        i.porcion_Ingrediente,
        i.ingType_ID,
        t.ingType_Name
      FROM Ingredients i
      JOIN Ingredient_Types t ON i.ingType_ID = t.ingType_ID
      ORDER BY t.ingType_ID, i.nombre_Ingrediente
    `)

    const ingredientesPorTipo: Record<number, any[]> = {
      1: [], 2: [], 3: [], 4: [], 5: [],
      6: [], 7: [], 8: [], 9: [],
    }

    result.rows.forEach((ingrediente: any) => {
      const tipo = ingrediente.ingType_ID
      if (ingredientesPorTipo[tipo]) {
        ingredientesPorTipo[tipo].push(ingrediente)
      }
    })

    return new Response(JSON.stringify(ingredientesPorTipo), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error al obtener ingredientes:", error)
    return new Response(JSON.stringify({ error: "Error interno del servidor" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
