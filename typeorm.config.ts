import { DataSource } from "typeorm" // pnpm add @nestjs/typeorm typeorm pg
import { config } from 'dotenv' // pnpm add dotenv
config() // Cargar las variables de entorno del archivo .env

export default new DataSource({
    type: 'postgres',
    host: process.env.BD_HOST,
    // port: parseInt(process.env.BD_PORT || '5432', 10)
    port: Number(process.env.BD_PORT) || 5432,
    username: process.env.BD_USERNAME,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_DATABASE,
    entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/src/database/migrations/*{.ts,.js}'],
    synchronize: false, // Nunca true en production
})
