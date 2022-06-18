import { MigrationInterface, QueryRunner } from 'typeorm';

export class advertisementCreate1655512408991 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE 
        advertisement (
          id UUID PRIMARY KEY,
          title VARCHAR(100) NOT NULL,
          address VARCHAR(250) NOT NULL,
          description VARCHAR(250) NULL,
          creation_date TIMESTAMP NOT NULL,
          category_id UUID NOT NULL,
          CONSTRAINT
            FK_advertisement_category_id
          FOREIGN KEY
            (category_id)
          REFERENCES category(id)
          ON UPDATE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE advertisement;`);
  }
}
