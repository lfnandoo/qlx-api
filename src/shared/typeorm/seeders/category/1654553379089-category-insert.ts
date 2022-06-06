import { MigrationInterface, QueryRunner } from 'typeorm';

export class categoryInsert1654553379089 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO 
        category (
          id,
          description
        )
      VALUES
        (uuid_generate_v4(), 'Veículos'),
        (uuid_generate_v4(), 'Imóveis'),
        (uuid_generate_v4(), 'Móveis'),
        (uuid_generate_v4(), 'Eletrodomésticos'),
        (uuid_generate_v4(), 'Eletrônicos'),
        (uuid_generate_v4(), 'Maquinários'),
        (uuid_generate_v4(), 'Roupas'),
        (uuid_generate_v4(), 'Calçados'),
        (uuid_generate_v4(), 'Vagas de emprego'),
        (uuid_generate_v4(), 'Serviços'),
        (uuid_generate_v4(), 'Outros');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM category;`);
  }
}
