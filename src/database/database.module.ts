import { Module, Global } from '@nestjs/common';

const API_KEY = '12345678';
const API_KEY_PROD = 'PROD1234567';

// decimos que sea global para que toda la aplicación y que tengan acceso al modulo y sea injectado
@Global()
@Module({
  providers: [
    {
      // nombre por el cual será llamado
      provide: 'API_KEY',
      // useValue sirve para crear un valor que será usado en más de un servicio o controlador y puede tomar el valor que queramos
      // useValue: API_KEY
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY
    },
  ],
  // sea utilizado desde cualquier modulo y al ser global no necesitamos importarlo, solo inyectarlo
  exports: ['API_KEY']
})
export class DatabaseModule {}
