import { Injectable } from '@nestjs/common';
import { Denuncia } from '../entities/denuncia.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';
//import * as bcrypt from 'bcrypt';
import {
  CrearDenunciaDTO,
  ActualizarDenunciaDTO,
  ActualizarEstadoDenunciaDTO,
} from '../dtos/denuncia.dto';

@Injectable()
export class DenunciaService {
  constructor(
    @InjectRepository(Denuncia) private denunciaRepo: Repository<Denuncia>,
  ) {}

  findAll() {
    return this.denunciaRepo.find();
  }

  async findOne(id: number) {
    const denuncia = await this.denunciaRepo.findOne({
      where: {
        idDenuncia: id,
      },
    });
    if (!denuncia) {
      throw new NotFoundError(`Complaint #${id} not found`);
    }
    return denuncia;
  }

  async create(body: CrearDenunciaDTO) {
    const denuncia = this.denunciaRepo.create(body); // hace un match
    return this.denunciaRepo.save(denuncia);
  }

  async update(id: number, body: ActualizarDenunciaDTO) {
    const denuncia = await this.denunciaRepo.findOne({
      where: {
        idDenuncia: id,
      },
    });
    this.denunciaRepo.merge(denuncia, body);
    return this.denunciaRepo.save(denuncia);
  }

  async updateState(id: number, body: ActualizarDenunciaDTO) {
    const denuncia = await this.denunciaRepo.findOne({
      where: {
        idDenuncia: id,
      },
    });
    this.denunciaRepo.merge(denuncia, body);
    return this.denunciaRepo.save(denuncia);
  }
}
