import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DenunciasModule } from './publicaciones/denuncias/denuncias.module';
import { UsuarioModule } from './usuarios/usuario.module';
import { environments } from './enviroments';
import config from './config';

import * as Joi from 'joi';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { RevisionesModule } from './publicaciones/revisiones/revisiones.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        HOST: Joi.string().required(),
        PORT: Joi.number(),
        DATABASE: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        PASSWORD: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        API_KET: Joi.string(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    DenunciasModule,
    UsuarioModule,
    RevisionesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
