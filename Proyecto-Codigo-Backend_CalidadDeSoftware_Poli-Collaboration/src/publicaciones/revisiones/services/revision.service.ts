import { Denuncia } from 'src/publicaciones/denuncias/entities/denuncia.entity';
import { Revision } from '../entities/revision.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';
import { CrearRevisionDTO, ActualizarRevisionDTO } from '../dtos/revision.dto';

import { Injectable } from '@nestjs/common';

@Injectable()
export class RevisionService {
  constructor(
    @InjectRepository(Revision) private revisionRepo: Repository<Revision>,
    @InjectRepository(Denuncia) private denunciaRepo: Repository<Denuncia>,
  ) {}

  findAll() {
    return this.revisionRepo.find();
  }

  async findOne(id: number) {
    const revision = await this.revisionRepo.findOne({
      where: {
        idRevision: id,
      },
    });
    if (!revision) {
      throw new NotFoundError(`Complaint #${id} not found`);
    }
    return revision;
  }

  async create(body: CrearRevisionDTO) {
    const nuevaRevision = this.revisionRepo.create(body);
    /* if(body.idUsuario){
          let usuario = await this.usuarioRepo.findOne(body.idUsuario)
          if(usuario){
             nuevaDenuncia.usuario = usuario;
          }
        }*/
    return this.denunciaRepo.save(nuevaRevision);
  }

  async update(id: number, body: ActualizarRevisionDTO) {
    const revision = await this.revisionRepo.findOne({
      where: {
        idRevision: id,
      },
    });
    this.revisionRepo.merge(revision, body);
    return this.revisionRepo.save(revision);
  }
}
