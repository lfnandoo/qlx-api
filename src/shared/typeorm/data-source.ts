import { DataSource, DataSourceOptions } from 'typeorm';

const appDataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrations: ['./src/shared/infra/http/migrations/**.ts'],
  entities: ['./src/modules/**/entities/*.ts'],
  synchronize: false,
  logging: false,
} as DataSourceOptions;

const appDataSource = new DataSource(appDataSourceOptions);

export { appDataSource };
