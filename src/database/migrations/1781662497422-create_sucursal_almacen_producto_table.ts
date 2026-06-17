import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSucursalAlmacenProductoTable1781662497422 implements MigrationInterface {
    name = 'CreateSucursalAlmacenProductoTable1781662497422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sucursales" ("id" SERIAL NOT NULL, "nombre" character varying(100) NOT NULL, "direccion" character varying(255) NOT NULL, "telefono" character varying(22) NOT NULL, "ciudad" character varying(255) NOT NULL, CONSTRAINT "PK_c2232960c9e458db5b18d35eeba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "almacen_producto" ("id" SERIAL NOT NULL, "cantidad_actual" integer NOT NULL, "fecha_actualizacion" date NOT NULL, "almacenId" integer, "productoId" integer, CONSTRAINT "PK_d012ea8045175d18843e998dea7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "almacen" ("id" SERIAL NOT NULL, "nombre" character varying(100) NOT NULL, "codigo" character varying(100), "descripcion" text, "sucursalId" integer, CONSTRAINT "PK_78a1ec4675cb911ff041d485b3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "almacen_producto" ADD CONSTRAINT "FK_696fa0d027c3bfd994ab1b8ecaa" FOREIGN KEY ("almacenId") REFERENCES "almacen"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "almacen_producto" ADD CONSTRAINT "FK_87fdbb2b70a59565ceca5e2a428" FOREIGN KEY ("productoId") REFERENCES "productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "almacen" ADD CONSTRAINT "FK_e314656bc172380d00921109fa4" FOREIGN KEY ("sucursalId") REFERENCES "sucursales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "almacen" DROP CONSTRAINT "FK_e314656bc172380d00921109fa4"`);
        await queryRunner.query(`ALTER TABLE "almacen_producto" DROP CONSTRAINT "FK_87fdbb2b70a59565ceca5e2a428"`);
        await queryRunner.query(`ALTER TABLE "almacen_producto" DROP CONSTRAINT "FK_696fa0d027c3bfd994ab1b8ecaa"`);
        await queryRunner.query(`DROP TABLE "almacen"`);
        await queryRunner.query(`DROP TABLE "almacen_producto"`);
        await queryRunner.query(`DROP TABLE "sucursales"`);
    }

}
