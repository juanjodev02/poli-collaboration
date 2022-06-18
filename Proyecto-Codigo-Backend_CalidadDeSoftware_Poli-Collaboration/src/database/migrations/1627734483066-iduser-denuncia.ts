import {MigrationInterface, QueryRunner} from "typeorm";

export class iduserDenuncia1627734483066 implements MigrationInterface {
    name = 'iduserDenuncia1627734483066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Denuncia" ADD "idUsuario" integer`);
        await queryRunner.query(`ALTER TABLE "Denuncia" ADD CONSTRAINT "FK_8ca232cd093bf1d9d01fbbb6fd9" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("idUsuario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Denuncia" DROP CONSTRAINT "FK_8ca232cd093bf1d9d01fbbb6fd9"`);
        await queryRunner.query(`ALTER TABLE "Denuncia" DROP COLUMN "idUsuario"`);
    }

}
