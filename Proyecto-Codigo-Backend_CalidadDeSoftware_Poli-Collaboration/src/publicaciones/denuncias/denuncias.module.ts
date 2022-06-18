import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuarioService } from 'src/usuarios/services/usuario.service';
import { DenunciaController } from './controllers/denuncia.controller';
import { Denuncia } from './entities/denuncia.entity';
import { DenunciaService } from './services/denuncia.service';

@Module({
  imports: [TypeOrmModule.forFeature([Denuncia, Usuario])],
  controllers: [DenunciaController],
  providers: [DenunciaService, UsuarioService],
})
export class DenunciasModule {}
