import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Denuncia } from '../denuncias/entities/denuncia.entity';
import { RevisionController } from './controllers/revision.controller';
import { Revision } from './entities/revision.entity';
import { RevisionService } from './services/revision.service';

@Module({
  imports: [TypeOrmModule.forFeature([Revision, Denuncia, Usuario])],
  controllers: [RevisionController],
  providers: [RevisionService]
})

export class RevisionesModule {}
