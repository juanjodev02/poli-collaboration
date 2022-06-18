import { Injectable } from '@nestjs/common';
import { UsuarioService } from 'src/usuarios/services/usuario.service';
import * as bcrypt from 'bcrypt';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { JwtService } from '@nestjs/jwt'
import PayloadToken from '../models/token.model';

@Injectable()
export class AuthService {
  constructor(private usaurioService: UsuarioService, private jwtService: JwtService) {}
  
  async validarUsuario(email: string, password: string) {
    const user = await this.usaurioService.findByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const { password, ...obj } = user;
        return obj;
      }
    }
    return null;
  }

  generateJWT(usuario: Usuario){
    const payload : PayloadToken = {role: usuario.rol, sub: usuario.idUsuario}
    return {
      access_token: this.jwtService.sign(payload),
      usuario,
    }
  }
}
