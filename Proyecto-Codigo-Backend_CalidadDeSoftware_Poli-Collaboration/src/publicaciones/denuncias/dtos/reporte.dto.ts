import {
    IsString,
    IsDate,
    IsNotEmpty,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  import { PartialType } from '@nestjs/swagger';
  
  export class CrearReporteDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly accionesTomadas: string;
    //@IsString()
    //@IsNotEmpty()
    //@ApiProperty()
    //readonly responsables: string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly evidencia: string;
    @IsDate()
    @IsNotEmpty()
    @ApiProperty()
    readonly fechaCreacion: Date;
    @IsDate()
    @IsNotEmpty()
    @ApiProperty()
    readonly ultimaActualizacion: Date;
  }
  
  export class ActualizarReporteDTO extends PartialType(CrearReporteDto) {}

