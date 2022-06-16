import { MigrationInterface, QueryRunner } from 'typeorm';

export class categoryCreate1654550035054 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE 
      category (
        id UUID PRIMARY KEY,
        description VARCHAR(50) NOT NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE category;`);
  }
}
