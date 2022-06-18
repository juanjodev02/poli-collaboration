import{
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';

export class CrearDenunciaDTO {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    readonly idUsuario: number;
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly modoCanal: string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly telefonoContacto: string;
    @IsOptional()
    @IsNotEmpty()
    @ApiProperty()
    readonly estado: string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly tipoDenuncia: string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly descripcionHechos: string;
    @IsOptional()
    @ApiProperty()
    readonly adjunto: string;
}

export class ActualizarDenunciaDTO extends PartialType(CrearDenunciaDTO) {}

export class ActualizarEstadoDenunciaDTO{
    @IsOptional()
    @IsNotEmpty()
    @ApiProperty()
    readonly estado: tiposEstado;
}

type tiposEstado = "En revisión"|"Creado"|"Finalizado"