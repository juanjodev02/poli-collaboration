import { EstadoUsuario } from '../entities/estado-usuario.entity';
import { PerfilUsuario } from '../entities/pefil-usuario.entity';
import { UsuarioRol } from '../../entities/usuario-rol.entity';
//import { Publicacion } from '../../publicaciones/entities/publicacion.entity';
import { Respuesta } from '../../publicaciones/preguntas/entities/respuesta.entity';
import {
  IsString,
  IsNumber,
  IsDate,
  IsNotEmpty,
  IsPositive,
  IsOptional,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import internal from 'stream';

export class CrearUsuarioDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly correoInstitucional: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly nombres: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly apellidos: string;
  @IsNotEmpty()
  @ApiProperty()
  readonly fechaNacimiento: Date;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly carrera: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly facultad: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly sexo: string;
}

export class ActualizarUsuarioDto extends PartialType(CrearUsuarioDto) {}
