import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'src/config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { username, host, name, password, databasePort } =
          configService.database;
        return {
          type: 'postgres',
          host,
          port: databasePort,
          username,
          password,
          database: name,
          synchronize: true,
          autoLoadEntities: true,
          entities: ['dist/**/*.entity.js'],
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
