import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { CrearUsuarioDto } from '../dtos/usuario.dto';
import { ActualizarUsuarioDto } from '../dtos/usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario) private userRepo: Repository<Usuario>,
  ) {}

  findAll() {
    return this.userRepo.find();
  }

  async findOne(id: number) {
    const usuario = await this.userRepo.findOne({
      where: {
        idUsuario: id,
      },
    });
    if (!usuario) {
      throw new NotFoundError(`Product #${id} not found`);
    }
    return usuario;
  }

  async create(body: CrearUsuarioDto) {
    const newUser = this.userRepo.create(body); // hace un match
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    return this.userRepo.save(newUser);
  }

  async update(id: number, body: ActualizarUsuarioDto) {
    const user = await this.userRepo.findOne({
      where: {
        idUsuario: id,
      },
    });
    this.userRepo.merge(user, body);
    return this.userRepo.save(user);
  }

  async delete(id: number) {
    await this.userRepo.delete(id);
    return true;
  }

  findByEmail(correoInstitucional: string) {
    return this.userRepo.findOne({ where: { correoInstitucional } });
  }
}
