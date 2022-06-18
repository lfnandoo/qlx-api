import { testDataSource } from './test-data-source';

console.log('Setup database');
testDataSource(true).then(() => process.exit());
