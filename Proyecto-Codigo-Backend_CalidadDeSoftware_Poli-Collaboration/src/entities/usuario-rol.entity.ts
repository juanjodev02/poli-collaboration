import { isNotEmpty, IsNotEmpty, isNotEmptyObject } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Rol } from './rol.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Entity({ name: 'Usuario_Rol' })
export class UsuarioRol {
  @PrimaryGeneratedColumn({ name: 'idUsuarioRol' })
  @IsNotEmpty()
  idUsuarioRol: number;
/*
  @ManyToOne(() => Usuario, (usuario) => usuario.usuariosRol)
  @JoinColumn({ name: 'idUsuario' })
  @IsNotEmpty()
  usuario: Usuario;
*/
  @ManyToOne(() => Rol, (rol) => rol.usuariosRol)
  @JoinColumn({ name: 'idRol' })
  @IsNotEmpty()
  rol: Rol;
}
