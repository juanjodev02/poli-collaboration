import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Accion } from './accion.entity';
import { UsuarioRol } from './usuario-rol.entity';

@Entity({ name: 'Rol' })
export class Rol {
  @PrimaryGeneratedColumn({ name: 'idRol' })
  @IsNotEmpty()
  @IsNumber()
  idRol: number;

  @Column({ name: 'nombreRol' })
  @IsNotEmpty()
  @IsString()
  nombreRol: string;

  @Column({ name: 'fechaCreacion' })
  @IsDate()
  @IsNotEmpty()
  fechaCreacion: Date;

  @Column({ name: 'ultimaActualizacion' })
  @IsDate()
  @IsNotEmpty()
  ultimaActualizacion: Date;

  @OneToMany(() => UsuarioRol, (usuarioRol) => usuarioRol.rol)
  @IsNotEmpty()
  usuariosRol: UsuarioRol[];

  @OneToMany(() => Accion, (accion) => accion.rol)
  @IsNotEmpty()
  acciones: Accion[];
}
