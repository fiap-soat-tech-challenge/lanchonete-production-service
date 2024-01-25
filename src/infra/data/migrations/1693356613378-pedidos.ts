import { MigrationInterface, QueryRunner } from 'typeorm';

export class Pedidos1693356613378 implements MigrationInterface {
  name = 'Pedidos1693356613378';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."pedidos_situacao_enum" AS ENUM('RECEBIDO', 'EM_PREPARACAO', 'PRONTO', 'FINALIZADO')`,
    );
    await queryRunner.query(
      `CREATE TABLE "pedidos" ("id" SERIAL NOT NULL, "orderId" integer NOT NULL, "precoTotal" integer NOT NULL, "situacao" "public"."pedidos_situacao_enum" NOT NULL DEFAULT 'RECEBIDO', "codigoPedido" integer NOT NULL, "cpfCliente" character varying, "itensPedido" json NOT NULL, CONSTRAINT "UQ_2e3f7e4fe73eb561557daec7ffb" UNIQUE ("orderId"), CONSTRAINT "PK_ebb5680ed29a24efdc586846725" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "pedidos"`);
    await queryRunner.query(`DROP TYPE "public"."pedidos_situacao_enum"`);
  }
}
