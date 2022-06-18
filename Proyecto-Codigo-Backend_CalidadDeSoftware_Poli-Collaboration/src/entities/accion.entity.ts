import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Rol } from './rol.entity';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Entity({ name: 'Accion' })
export class Accion {
  @PrimaryGeneratedColumn({ name: 'idAccion' })
  @IsNumber()
  @IsNotEmpty()
  idAccion: number;

  @ManyToOne(() => Rol, (rol) => rol.acciones)
  @JoinColumn({ name: 'idRol' })
  @IsNotEmpty()
  rol: Rol;

  @Column({ name: 'nombreAccion' })
  @IsString()
  @IsNotEmpty()
  nombreAccion: string;

  @Column({ name: 'fechaCreacion' })
  @IsDate()
  @IsNotEmpty()
  fechaCreacion: Date;

  @Column({ name: 'ultimaActualizacion' })
  @IsDate()
  @IsNotEmpty()
  ultimaActualizacion: Date;
}
