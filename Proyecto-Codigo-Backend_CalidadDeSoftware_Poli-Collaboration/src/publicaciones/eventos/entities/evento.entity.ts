import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { CategoriaEvento } from './categoria-evento.entity';
//import { Publicacion } from '../../entities/publicacion.entity';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Entity({ name: 'Evento' })
export class Evento {
  @PrimaryGeneratedColumn({ name: 'idEvento' })
  @IsNumber()
  @IsNotEmpty()
  idEvento: number;
/*
  @OneToOne(() => Publicacion)
  @JoinColumn({ name: 'idPublicacion' })
  @IsNotEmpty()
  publicacion: Publicacion;
*/
  @ManyToOne(() => CategoriaEvento, (categoria) => categoria.eventos)
  @JoinColumn({ name: 'idCategoria' })
  @IsNotEmpty()
  categoriaEvento: CategoriaEvento;

  @Column({ name: 'tituloEvento' })
  @IsString()
  @IsNotEmpty()
  tituloEvento: string;

  @Column({ name: 'organizador' })
  @IsString()
  @IsNotEmpty()
  organizador: string;

  @Column({ name: 'dateTimeEvento' })
  @IsDate()
  @IsNotEmpty()
  dateTimeEvento: Date;

  @Column({ name: 'descripcion' })
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @Column({ name: 'estado' })
  @IsString()
  @IsNotEmpty()
  estado: string;

  @Column({ name: 'numeroInteresados' })
  @IsNumber()
  @IsNotEmpty()
  numeroInteresados: number;

  @Column({ name: 'fechaExpiracion' })
  @IsDate()
  @IsNotEmpty()
  fechaExpiracion: Date;
}
