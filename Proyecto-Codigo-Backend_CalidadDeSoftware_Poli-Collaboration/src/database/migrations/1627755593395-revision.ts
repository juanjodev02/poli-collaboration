import {MigrationInterface, QueryRunner} from "typeorm";

export class revision1627755593395 implements MigrationInterface {
    name = 'revision1627755593395'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Revision" ADD "idDenuncia" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Revision" ADD CONSTRAINT "UQ_7882d7247d305ebc13028d287a2" UNIQUE ("idDenuncia")`);
        await queryRunner.query(`ALTER TABLE "Denuncia" DROP CONSTRAINT "FK_8ca232cd093bf1d9d01fbbb6fd9"`);
        await queryRunner.query(`ALTER TABLE "Denuncia" ALTER COLUMN "idUsuario" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Denuncia" ADD CONSTRAINT "FK_8ca232cd093bf1d9d01fbbb6fd9" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("idUsuario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Revision" ADD CONSTRAINT "FK_7882d7247d305ebc13028d287a2" FOREIGN KEY ("idDenuncia") REFERENCES "Denuncia"("idDenuncia") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Revision" DROP CONSTRAINT "FK_7882d7247d305ebc13028d287a2"`);
        await queryRunner.query(`ALTER TABLE "Denuncia" DROP CONSTRAINT "FK_8ca232cd093bf1d9d01fbbb6fd9"`);
        await queryRunner.query(`ALTER TABLE "Denuncia" ALTER COLUMN "idUsuario" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Denuncia" ADD CONSTRAINT "FK_8ca232cd093bf1d9d01fbbb6fd9" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("idUsuario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Revision" DROP CONSTRAINT "UQ_7882d7247d305ebc13028d287a2"`);
        await queryRunner.query(`ALTER TABLE "Revision" DROP COLUMN "idDenuncia"`);
    }

}
