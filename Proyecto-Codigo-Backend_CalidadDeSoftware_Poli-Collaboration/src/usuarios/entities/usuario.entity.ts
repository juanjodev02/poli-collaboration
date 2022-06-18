import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  isString,
  IsString,
  isValidationOptions,
  Length,
  MinLength,
  validate,
} from 'class-validator';

import { EstadoUsuario } from './estado-usuario.entity';
import { UsuarioRol } from '../../entities/usuario-rol.entity';
import { PerfilUsuario } from './pefil-usuario.entity';
//import { Publicacion } from '../../publicaciones/entities/publicacion.entity';
import { Respuesta } from '../../publicaciones/preguntas/entities/respuesta.entity';
import { Exclude } from 'class-transformer';
import { Denuncia } from 'src/publicaciones/denuncias/entities/denuncia.entity';
//import { ValidationTypes } from 'class-validator';

@Entity('Usuario')
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'idUsuario' })
  idUsuario: number;

  @ManyToOne(() => EstadoUsuario, (estado) => estado.usuarios)
  @JoinColumn({ name: 'idEstadoUsuario' })
  estado: EstadoUsuario;

  @OneToOne(() => PerfilUsuario)
  @JoinColumn({ name: 'idPerfilUsuario' })
  /*@IsNotEmpty()*/
  perfil: PerfilUsuario;
  /*
  @OneToMany(() => UsuarioRol, (usuarioRol) => usuarioRol.usuario)
  /*@IsNotEmpty()*/
  //usuariosRol: UsuarioRol[];


  @OneToMany(() => Denuncia, (denuncia) => denuncia.usuario)
  @IsNotEmpty()
  denuncias: Denuncia[];

  @OneToMany(() => Respuesta, (respuesta) => respuesta.usuario)
  /*@IsNotEmpty()*/
  respuestas: Respuesta[];

  @Column({ name: 'correoInstitucional', unique: true })
  //@ValidationTypes.isValid(correoIn);
  @IsEmail()
  @IsNotEmpty()
  correoInstitucional: string;

  @Column({ name: 'nombres' })
  @Length(5, 55)
  @IsNotEmpty()
  @IsString()
  nombres: string;

  @Column({ name: 'apellidos' })
  @Length(5, 55)
  @IsNotEmpty()
  @IsString()
  apellidos: string;

  @Column({ name: 'fechaNacimiento' })
  @IsDate()
  @IsNotEmpty()
  fechaNacimiento: Date;

  @Column({ name: 'carrera' })
  @IsNotEmpty()
  @IsString()
  carrera: string;

  @Column({ name: 'facultad' })
  @Length(20, 40)
  @IsNotEmpty()
  @IsString()
  facultad: string;

  @Column({ name: 'sexo' })
  @Length(7, 10)
  @IsNotEmpty()
  @IsString()
  sexo: string;

  @Column({ name: 'rol' })
  @Length(5, 55)
  @IsNotEmpty()
  @IsString()
  rol: string;

  @Exclude()
  @Column({ name: 'password' })
  @MinLength(8)
  @IsNotEmpty()
  @IsString()
  password: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaCreacion: Date;

  @Exclude()
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  ultimaActualizacion: Date;
}