import { config } from 'dotenv' // pnpm add dotenv
config() // Cargar las variables de entorno del archivo .env

export const jwtConstants = {
  secret: process.env.JWT_SECRET
};