// dependencias de terceros deben de ir primero
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import  * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import config from './config';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    DatabaseModule,
    // forRoot es porque va a tener configuraciones
    ConfigModule.forRoot({
      // que archivo va a leer y con su variable de ambiente y en caso de que no resuelva uno, toma el .env
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      // cargar la configuración del tipado de la configuración
      load: [config],
      // quede habil para todos los modulos con la inyección
      isGlobal: true,
      // validación del esquema
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required()
      })
    }),
   ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
