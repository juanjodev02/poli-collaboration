import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Revision } from '../../revisiones/entities/revision.entity';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Entity({ name: 'Reporte_Denuncia' })
export class ReporteDenuncia {
  @PrimaryGeneratedColumn({ name: 'idReporteDenuncia' })
  @IsNotEmpty()
  @IsNumber()
  idReporteDenuncia: number;

  @Column({ name: 'idDenuncia' })
  @IsNotEmpty()
  @IsString()
  idDenuncia: string;

  @OneToOne(() => Revision)
  @JoinColumn({ name: 'idRevision' })
  @IsNotEmpty()
  @IsNumber()
  idRevision: number;

  @Column({ name: 'accionesTomadas' })
  @IsNotEmpty()
  @IsString()
  accionesTomadas: string;

  @Column({ name: 'responsables' })
  @IsNotEmpty()
  @IsString()
  responsables: string;

  @Column({ name: 'evidencia' })
  @IsNotEmpty()
  @IsString()
  evidencia: string;

  @Column({ name: 'fechaCreacion' })
  @IsDate()
  @IsNotEmpty()
  fechaCreacion: Date;

  @Column({ name: 'ultimaActualizacion' })
  @IsDate()
  @IsNotEmpty()
  ultimaActualizacion: Date;
}
