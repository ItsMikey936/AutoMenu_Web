// src/lib/schema.ts

export interface Ingredient {
  ingredient_ID: number;
  nombre_Ingrediente: string;
  porcion_Ingrediente: number;
  unidad_Ingrediente: string;
  ingType_ID: number;
}

export interface Database {
  ingredients: Ingredient;
  // Agrega más tablas aquí si las tienes
}
