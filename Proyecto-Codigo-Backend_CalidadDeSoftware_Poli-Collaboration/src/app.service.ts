import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configProject: ConfigType<typeof config>,
  ) {}

  getHello(): string {
    console.log(this.configProject.database.name);
    return 'Proyecto A.D.A.M - Poli Collaboration';
  }
}
