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
import { RevisionService } from '../services/revision.service';
import { DenunciaService } from 'src/publicaciones/denuncias/services/denuncia.service';
import { CrearRevisionDTO, ActualizarRevisionDTO } from '../dtos/revision.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('revision')
@Controller('api/revision')
export class RevisionController {
  constructor(
    private _httpRevisionService: RevisionService,
  ) //private _httpDenunciaService: DenunciaService,
  {}

  @Roles(Role.MODERADOR)
  @Get()
  @ApiOperation({ summary: 'Lista de revisiones de la aplicación.' })
  getAll() {
    return this._httpRevisionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una revision según su Id' })
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this._httpRevisionService.findOne(id);
  }

  @Public()
  @Post()
  @ApiOperation({ summary: 'Crear una revision' })
  async create(@Body() denuncia: CrearRevisionDTO) {
    return this._httpRevisionService.create(denuncia);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una revision' })
  update(@Param('id') id: number, @Body() body: ActualizarRevisionDTO) {
    return this._httpRevisionService.update(id, body);
  }
}
