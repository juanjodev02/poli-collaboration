import{
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';

export class CrearRevisionDTO {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    readonly idDenuncia: number;
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly observacion: string;
 
}
export class ActualizarRevisionDTO extends PartialType(CrearRevisionDTO) {}
