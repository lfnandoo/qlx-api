import { DataSource } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { gCall } from '../../../../test-utils/g-call';
import { testDataSource } from '../../../../test-utils/test-data-source';
import { AdvertisementRepository } from '../../infra/repositories/advertisement.repository';
import { CategoryRepository } from '../../infra/repositories/category.repository';
import { AdvertisementRepositoryModel } from '../../repositories/advertisement-repository.model';
import { CategoryRepositoryModel } from '../../repositories/category-repository.model';
import {
  CreateAdvertisementUseCase,
  ICreateAdvertisementModel,
} from '../createAdvertisement/create-advertisement.use-case';

let dataSource: DataSource;
let categoryRepository: CategoryRepositoryModel;
let advertisementRepository: AdvertisementRepositoryModel;
let createAdvertisementUseCase: CreateAdvertisementUseCase;

beforeAll(async () => {
  dataSource = await testDataSource();
  categoryRepository = new CategoryRepository(dataSource);
  advertisementRepository = new AdvertisementRepository(dataSource);
  createAdvertisementUseCase = new CreateAdvertisementUseCase(advertisementRepository);
});

afterAll(async () => {
  dataSource.destroy();
});

const findAdvertisementMutation = `
  query FindAdvertisement($advertisementId: String!) {
    findAdvertisement(id: $advertisementId) {
      id,
      title,
      address,
      categoryId,
      creationDate
    }
  }
`;

describe('Find Advertisement Resolver', () => {
  it('should be able to find a advertisement', async () => {
    const category = await categoryRepository.findByDescription('Roupas');
    const createAdvertisementModel: ICreateAdvertisementModel = {
      title: 'Casaco',
      address: 'São Paulo',
      categoryId: category?.id || '',
    };

    const entity = await createAdvertisementUseCase.execute(createAdvertisementModel);

    expect(entity).toBeDefined();

    const response = await gCall({
      source: findAdvertisementMutation,
      variableValues: {
        advertisementId: entity.id,
      },
    });

    expect(response.data?.findAdvertisement).toBeDefined();
    expect(response.data?.findAdvertisement).toHaveProperty('id');
    expect(response.data?.findAdvertisement).toHaveProperty('title');
    expect(response.data?.findAdvertisement).toHaveProperty('address');
    expect(response.data?.findAdvertisement).toHaveProperty('categoryId');
    expect(response.data?.findAdvertisement).toHaveProperty('creationDate');
  });

  it('should not be able to find a non exinsting advertisement', async () => {
    const response = await gCall({
      source: findAdvertisementMutation,
      variableValues: {
        advertisementId: uuidv4(),
      },
    });

    expect(response.errors).toBeDefined();
    expect(response.errors![0]).toBeDefined();
    expect(response.errors![0].message).toContain("Entity doesn't exists");
  });
});
