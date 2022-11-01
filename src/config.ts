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
    apiKey: process.env.API_KEY,
  };
});
