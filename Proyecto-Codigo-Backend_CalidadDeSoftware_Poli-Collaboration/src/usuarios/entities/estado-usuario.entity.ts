import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Usuario } from './usuario.entity';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Entity({ name: 'Estado_Usuario' })
export class EstadoUsuario {
  @PrimaryGeneratedColumn({ name: 'idEstadoUsuario' })
  @IsNumber()
  @IsNotEmpty()
  idEstadoUsuario: number;

  @Column({ name: 'nombreEstadoUsuario' })
  @IsString()
  @IsNotEmpty()
  nombreEstadoUsuario: string;

  @Column({ name: 'fechaCreacion' })
  @IsDate()
  @IsNotEmpty()
  fechaCreacion: Date;

  @Column({ name: 'ultimaActualizacion' })
  @IsDate()
  @IsNotEmpty()
  ultimaActualizacion: Date;

  @OneToMany(() => Usuario, (usuario) => usuario.estado)
  @IsNotEmpty()
  usuarios: Usuario[];
}
