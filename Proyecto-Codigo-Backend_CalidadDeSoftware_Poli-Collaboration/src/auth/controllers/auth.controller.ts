import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Public } from '../decorators/public.decorator';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuarios/services/usuario.service';

@Controller('api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private userService: UsuarioService,
  ) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request) {
    const usuario = req.user as Usuario;
    return this.authService.generateJWT(usuario);
  }

  @Get('getuser')
  async getUsuario(@Req() req: Request) {
    console.log(req.headers.authorization);
    const reqToken = req.headers.authorization.split(' ')[1];
    console.log(reqToken);
    const values = this.jwtService.decode(reqToken);
    console.log(values);
    const user = await this.userService.findOne(values.sub);
    return user;
  }
}
