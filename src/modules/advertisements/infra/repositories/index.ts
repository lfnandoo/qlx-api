import { appDataSource } from '../../../../shared/typeorm/data-source';
import { AdvertisementRepository } from './advertisement.repository';
import { CategoryRepository } from './category.repository';

const advertisementRepository = new AdvertisementRepository(appDataSource);
const categoryRepository = new CategoryRepository(appDataSource);

export { advertisementRepository, categoryRepository };
