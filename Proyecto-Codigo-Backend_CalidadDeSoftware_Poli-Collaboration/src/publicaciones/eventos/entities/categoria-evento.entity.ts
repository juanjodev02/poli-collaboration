import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Evento } from './evento.entity';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Entity({ name: 'Categoria_Evento' })
export class CategoriaEvento {
  @PrimaryGeneratedColumn({ name: 'idCategoriaEvento' })
  @IsNumber()
  @IsNotEmpty()
  idCategoriaEvento: number;

  @OneToMany(() => Evento, (evento) => evento.categoriaEvento)
  eventos: Evento[];
  @IsNotEmpty()
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
