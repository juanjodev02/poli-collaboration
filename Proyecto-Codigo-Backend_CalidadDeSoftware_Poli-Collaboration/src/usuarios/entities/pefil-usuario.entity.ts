import {
  IsAlphanumeric,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Perfil_Usuario' })
export class PerfilUsuario {
  @PrimaryGeneratedColumn({ name: 'idPerfil' })
  @IsNumber()
  @IsNotEmpty()
  idPerfil: number;

  @Column({ name: 'numeroPreguntas' })
  @IsNumber()
  @IsNotEmpty()
  numeroPreguntas: number;

  @Column({ name: 'numeroRespuestas' })
  @IsNumber()
  @IsNotEmpty()
  numeroRespuestas: number;

  @Column({ name: 'fechaCreacion' })
  @IsDate()
  @IsNotEmpty()
  fechaCreacion: Date;

  @Column({ name: 'ultimaActualizacion' })
  @IsDate()
  @IsNotEmpty()
  ultimaActualizacion: Date;
}
