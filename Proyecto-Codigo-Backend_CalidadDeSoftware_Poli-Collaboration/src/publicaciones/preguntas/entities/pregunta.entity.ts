import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { CategoriaPregunta } from './categoria-pregunta.entity';
import { Respuesta } from './respuesta.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Entity({ name: 'Pregunta' })
export class Pregunta {
  @PrimaryGeneratedColumn({ name: 'idPregunta' })
  @IsNumber()
  @IsNotEmpty()
  idPregunta: number;
/*
  @OneToOne(() => Publicacion)
  @JoinColumn({ name: 'idPublicacion' })
  @IsNotEmpty()
  publicacion: Publicacion;
*/
  @OneToMany(() => Respuesta, (respuesta) => respuesta.pregunta)
  @IsNotEmpty()
  respuestas: Respuesta[];

  @ManyToOne(
    () => CategoriaPregunta,
    (categoriaPregunta) => categoriaPregunta.preguntas,
  )
  @JoinColumn({ name: 'idCategoriaPregunta' })
  categoriaPregunta: CategoriaPregunta[];

  @Column({ name: 'titulo' })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @Column({ name: 'contenido' })
  @IsString()
  @IsNotEmpty()
  contenido: string;

  @Column({ name: 'estado' })
  @IsString()
  @IsNotEmpty()
  estado: string;
/*
  @ManyToOne(() => Usuario, (usuario) => usuario.publicaciones)
  @JoinColumn({ name: 'idUsuario' })
  @IsNotEmpty()
  usuario: Usuario;
*/
  @Column({ name: 'fechaCreacion' })
  @IsDate()
  @IsNotEmpty()
  fechaCreacion: Date;

  @Column({ name: 'ultimaActualizacion' })
  @IsDate()
  @IsNotEmpty()
  ultimaActualizacion: Date;
}
