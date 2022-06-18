import {MigrationInterface, QueryRunner} from "typeorm";

export class fechaCreacionDenuncia1627738748509 implements MigrationInterface {
    name = 'fechaCreacionDenuncia1627738748509'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Denuncia" DROP COLUMN "fechaCreacion"`);
        await queryRunner.query(`ALTER TABLE "Denuncia" ADD "fechaCreacion" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Denuncia" DROP COLUMN "ultimaActualizacion"`);
        await queryRunner.query(`ALTER TABLE "Denuncia" ADD "ultimaActualizacion" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Denuncia" DROP COLUMN "ultimaActualizacion"`);
        await queryRunner.query(`ALTER TABLE "Denuncia" ADD "ultimaActualizacion" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Denuncia" DROP COLUMN "fechaCreacion"`);
        await queryRunner.query(`ALTER TABLE "Denuncia" ADD "fechaCreacion" TIMESTAMP NOT NULL`);
    }

}
