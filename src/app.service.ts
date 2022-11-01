import { Injectable, Inject } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { Db } from 'mongodb';
import config from './config';

@Injectable()
export class AppService {
  // inyectar un valor que queremos que usemos en toda la aplicación
  constructor(
    @Inject('API_KEY') private apiKey: string,
    // @Inject('TASKS') private tasks: any[]
    // private configService: ConfigService
    @Inject('MONGO') private database: Db,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  getHello(): string {
    // forma de tipar el valor regresa <string>
    const apiKey = this.configService.apiKey;
    const databaseName = this.configService.database;
    // console.log(this.tasks)
    return `Hello world ${apiKey} db: ${databaseName.name}`;
  }

  getTasks() {
    // query hacia la collection "tasks"
    const collection = this.database.collection('tasks');
    const tasks = collection.find().toArray();
    return tasks;
  }
}
