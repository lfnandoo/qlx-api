import { DataSource, DataSourceOptions } from 'typeorm';

const appDataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'docker',
  password: 'ignite',
  database: 'qlx',
  migrations: ['./src/shared/infra/http/migrations/**.ts'],
  entities: ['./src/modules/**/entities/*.ts'],
  synchronize: false,
  logging: false,
} as DataSourceOptions;

const appDataSource = new DataSource(appDataSourceOptions);

export { appDataSource };
