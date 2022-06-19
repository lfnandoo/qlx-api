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
import { IUpdateAdvertisementModel } from './update-advertisement.use-case';

let dataSource: DataSource;
let categoryRepository: CategoryRepositoryModel;
let advertisementRepository: AdvertisementRepositoryModel;
let createAdvertisementUseCase: CreateAdvertisementUseCase;

const updateAdvertisementMutation = `
  mutation UpdateAdvertisement($data: UpdateAdvertisementDTO!, $advertisementId: String!) {
    updateAdvertisement(data: $data, id: $advertisementId) {
      id      
    }
  }
`;

describe('Update Advertisement Resolver', () => {
  beforeEach(async () => {
    dataSource = await testDataSource();
    categoryRepository = new CategoryRepository(dataSource);
    advertisementRepository = new AdvertisementRepository(dataSource);
    createAdvertisementUseCase = new CreateAdvertisementUseCase(advertisementRepository);
  });

  afterEach(async () => {
    await dataSource.destroy();
  });

  it('should be able to update a advertisement', async () => {
    const category = await categoryRepository.findByDescription('Roupas');
    const createAdvertisementModel: ICreateAdvertisementModel = {
      title: 'Casaco',
      address: 'São Paulo',
      categoryId: category?.id || '',
    };

    const entity = await createAdvertisementUseCase.execute(createAdvertisementModel);

    expect(entity).toBeDefined();

    const updateAdvertisementModel: Omit<IUpdateAdvertisementModel, 'id'> = {
      address: 'Rio de Janeiro',
    };

    const response = await gCall({
      source: updateAdvertisementMutation,
      variableValues: {
        advertisementId: entity.id,
        data: updateAdvertisementModel,
      },
    });

    expect(response.data?.updateAdvertisement).toBeDefined();

    const updatedEntity = await advertisementRepository.findById(entity.id);

    expect(updatedEntity?.address).toEqual(updateAdvertisementModel.address);
  });

  it('should not be able to update a non exinsting advertisement', async () => {
    const updateAdvertisementModel: Omit<IUpdateAdvertisementModel, 'id'> = {
      address: 'Rio de Janeiro',
    };
    const response = await gCall({
      source: updateAdvertisementMutation,
      variableValues: {
        advertisementId: uuidv4(),
        data: updateAdvertisementModel,
      },
    });

    expect(response.errors).toBeDefined();
    expect(response.errors![0]).toBeDefined();
    expect(response.errors![0].message).toContain("Entity doesn't exists");
  });
});
