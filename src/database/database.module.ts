import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongoClient } from 'mongodb';
// mongoose es un ORM para mongodb, los ORM nos ayuda con las consultas a la base de datos y no tener que aprender SQL para hacer consultas
// se ocupan schemas para manejar mongoose, los schemas se usan los entities
import { MongooseModule } from '@nestjs/mongoose'

import config from 'src/config';

const API_KEY = '12345678';
const API_KEY_PROD = 'PROD1234567';

// decimos que sea global para que toda la aplicación y que tengan acceso al modulo y sea injectado
@Global()
@Module({
  imports:[
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { connection, host, port, user, password, dbName } = configService.mongo
        return {
          uri: `${connection}://${host}:${port}`,
          user,
          pass: password,
          dbName
        }
      },
      // necesita la configuración de config.(valores)
      inject: [config.KEY]
    })
    // MongooseModule.forRoot('mongodb://localhost:27017', {
    //   user: 'example',
    //   pass: 'example',
    //   dbName: 'example',
    // })
  ],
  providers: [
    {
      // nombre por el cual será llamado
      provide: 'API_KEY',
      // useValue sirve para crear un valor que será usado en más de un servicio o controlador y puede tomar el valor que queramos
      // useValue: API_KEY
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'MONGO',
      // useFactory se puede usar para cosas asincronas o para modulos que seran inyectados
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, user , password, host, port, dbName } = configService.mongo;
        const uri = `${connection}://${user}:${password}@${host}:${port}/${dbName}?authSource=admin`;
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db('modular');
        return database;
      },
      // cuando queremos inyectar un servicio en otro servicio se usa inject y le decimos que dependencia queremos inyectar
      inject: [config.KEY],
    },
  ],
  // para que sea utilizado desde cualquier modulo y al ser global no necesitamos importarlo, solo inyectarlo
  exports: ['API_KEY', 'MONGO', MongooseModule],
})
export class DatabaseModule {}
