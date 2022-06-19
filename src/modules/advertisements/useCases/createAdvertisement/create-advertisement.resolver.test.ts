import { DataSource } from 'typeorm';
import { gCall } from '../../../../test-utils/g-call';
import { testDataSource } from '../../../../test-utils/test-data-source';
import { AdvertisementRepository } from '../../infra/repositories/advertisement.repository';
import { CategoryRepository } from '../../infra/repositories/category.repository';
import { AdvertisementRepositoryModel } from '../../repositories/advertisement-repository.model';
import { CategoryRepositoryModel } from '../../repositories/category-repository.model';

let dataSource: DataSource;
let categoryRepository: CategoryRepositoryModel;
let advertisementRepository: AdvertisementRepositoryModel;

const createAdvertisementMutation = `
  mutation CreateAdvertisement($data: CreateAdvertisementDTO!) {
    createAdvertisement(data: $data) {
      id
    }
  }
`;

describe('Create Advertisement Resolver', () => {
  beforeEach(async () => {
    dataSource = await testDataSource();
    categoryRepository = new CategoryRepository(dataSource);
    advertisementRepository = new AdvertisementRepository(dataSource);
  });

  afterEach(async () => {
    await dataSource.destroy();
  });

  it('should be able to create a new advertisement', async () => {
    const category = await categoryRepository.findByDescription('Roupas');
    const data = { title: 'Camisa do Brasil', address: 'Rio de Janeiro', categoryId: category?.id };
    const response = await gCall({
      source: createAdvertisementMutation,
      variableValues: {
        data,
      },
    });

    expect(response.data?.createAdvertisement).toHaveProperty('id');

    const entity = await advertisementRepository.findById(response.data?.createAdvertisement.id);

    expect(entity).toBeDefined();
  });

  it('should not be able to create a new advertisement without category id', async () => {
    const data = { title: 'Camisa do Brasil', address: 'Rio de Janeiro' };
    const response = await gCall({
      source: createAdvertisementMutation,
      variableValues: {
        data,
      },
    });

    expect(response.errors).toBeDefined();

    expect(response.errors?.length).toEqual(1);
  });
});
