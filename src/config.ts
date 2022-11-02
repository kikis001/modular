// tipar la configuración
import { registerAs } from '@nestjs/config';

// nombre de la función ('config')
export default registerAs('config', () => {
  return {
    // crear un conjunto de variables
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    mongo: {
      connection: process.env.MONGO_CONNECTION,
      user: process.env.MONGO_INITDB_ROOT_USERNAME,
      password: process.env.MONGO_INITDB_ROOT_PASSWORD,
      port: parseInt(process.env.MONGO_PORT, 10),
      host: process.env.MONGO_HOST,
      dbName: process.env.MONGO_DB,
    },
    apiKey: process.env.API_KEY,
  };
});
