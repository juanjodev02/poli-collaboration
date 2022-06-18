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
} from 'typeorm';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Exclude } from 'class-transformer';
//import { Publicacion } from 'src/publicaciones/entities/publicacion.entity';

@Entity({ name: 'Denuncia' })
export class Denuncia {
  @PrimaryGeneratedColumn({ name: 'idDenuncia' })
  @IsNumber()
  @IsNotEmpty()
  idDenuncia: number;
  /*
  @OneToOne(() => Publicacion)
  @JoinColumn({ name: 'idPublicacion' })
  @IsNotEmpty()
  publicacion: Publicacion;
*/
  @Column({ name: 'modoCanal' })
  @IsString()
  @IsNotEmpty()
  modoCanal: string;

  @Column({ name: 'telefonoContacto' })
  @IsString()
  @IsNotEmpty()
  telefonoContacto: string;

  @Column({ name: 'estado' })
  @IsString()
  @IsNotEmpty()
  estado: string;

  @Column({ name: 'tipoDenuncia' })
  @IsString()
  @IsNotEmpty()
  tipoDenuncia: string;

  @Column({ name: 'descripcionHechos' })
  @IsString()
  @IsNotEmpty()
  descripcionHechos: string;

  @Column({ name: 'adjunto' })
  @IsString()
  @IsNotEmpty()
  adjunto: string;

  // add column explicitly here
  @Column({ name: 'idUsuario' })
  idUsuario: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.denuncias)
  @JoinColumn({ name: 'idUsuario' })
  @IsNotEmpty()
  usuario: Usuario;

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
