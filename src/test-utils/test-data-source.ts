import { appDataSource } from '../shared/typeorm/data-source';

async function testDataSource(drop = true) {
  appDataSource.setOptions({ database: 'tests', migrationsRun: false, dropSchema: drop });
  await appDataSource.initialize();
  await appDataSource.runMigrations();
  return appDataSource;
}

export { testDataSource };
