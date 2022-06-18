import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsuarioService } from '../services/usuario.service';
import { CrearUsuarioDto, ActualizarUsuarioDto } from '../dtos/usuario.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('usuario')
@Controller('api/usuario')
export class UsuarioController {
  constructor(private _httpUserService: UsuarioService) {}

  @Roles(Role.ESTUDIANTE)
  @Get()
  @ApiOperation({ summary: 'Lista de usuarios de la aplicación.' })
  getAll() {
    return this._httpUserService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario según su Id' })
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this._httpUserService.findOne(id);
  }

  @Public()
  @Post()
  @ApiOperation({ summary: 'Crear un usuario' })
  async create(@Body() usuario: CrearUsuarioDto) {
    let nuevoUsuario = {...usuario, facultad: "SISTEMAS", rol: "estudiante"}
    return this._httpUserService.create(nuevoUsuario);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un usuario' })
  update(@Param('id') id: number, @Body() body: ActualizarUsuarioDto) {
    return this._httpUserService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario' })
  delete(@Param('id') id: number) {
    return this._httpUserService.delete(id);
  }
}
