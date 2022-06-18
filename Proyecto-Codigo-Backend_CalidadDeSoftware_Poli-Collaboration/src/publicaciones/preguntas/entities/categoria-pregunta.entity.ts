import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Pregunta } from './pregunta.entity';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Entity({ name: 'Categoria_Pregunta' })
export class CategoriaPregunta {
  @PrimaryGeneratedColumn({ name: 'idCategoriaPregunta' })
  @IsNumber()
  @IsNotEmpty()
  idCategoriaPregunta: number;

  @OneToMany(() => Pregunta, (pregunta) => pregunta.categoriaPregunta)
  @IsNotEmpty()
  preguntas: Pregunta[];

  @Column({ name: 'nombreCategoria' })
  @IsString()
  @IsNotEmpty()
  nombreCategoria: string;

  @Column({ name: 'descripcion' })
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @Column({ name: 'fechaCreacion' })
  @IsDate()
  @IsNotEmpty()
  fechaCreacion: Date;

  @Column({ name: 'ultimaActualizacion' })
  @IsDate()
  @IsNotEmpty()
  ultimaActualizacion: Date;
}
