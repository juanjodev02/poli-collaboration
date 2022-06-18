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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { DenunciaService } from '../services/denuncia.service';
import {
  CrearDenunciaDTO,
  ActualizarDenunciaDTO,
  ActualizarEstadoDenunciaDTO,
} from '../dtos/denuncia.dto';
import { UsuarioService } from 'src/usuarios/services/usuario.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('denuncia')
@Controller('api/denuncia')
export class DenunciaController {
  constructor(
    private _httpDenunciaService: DenunciaService,
    private _httpUsuarioService: UsuarioService,
  ) {}

  @Roles(Role.MODERADOR)
  @Get()
  @ApiOperation({ summary: 'Lista de usuarios de la aplicación.' })
  async getAll() {
    let denunciasObtenidas = await this._httpDenunciaService.findAll();
    let denunciasMostradas = [];
    for (const denuncia of denunciasObtenidas) {
      if (denuncia.modoCanal === 'No confidencial') {
        if (denuncia.idUsuario) {
          let usuario = await this._httpUsuarioService.findOne(
            denuncia.idUsuario,
          );
          denunciasMostradas.push({
            ...denuncia,
            usuario: `${usuario.nombres} ${usuario.apellidos}`,
          });
        } else {
          denunciasMostradas.push(denuncia);
        }
      } else {
        denunciasMostradas.push(denuncia);
      }
    }
    return denunciasMostradas;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una denuncia según su Id' })
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this._httpDenunciaService.findOne(id);
  }

  @Public()
  @Post()
  @ApiOperation({ summary: 'Crear una denuncia' })
  async create(@Body() denuncia: CrearDenunciaDTO) {
    return this._httpDenunciaService.create(denuncia);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una denuncia' })
  update(@Param('id') id: number, @Body() body: ActualizarDenunciaDTO) {
    return this._httpDenunciaService.update(id, body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar estado de una denuncia' })
  updateState(
    @Param('updateState') id: number,
    @Body() body: ActualizarEstadoDenunciaDTO,
  ) {
    return this._httpDenunciaService.updateState(id, body);
  }
}
