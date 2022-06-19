import { DataSource } from 'typeorm';
import { gCall } from '../../../../test-utils/g-call';
import { testDataSource } from '../../../../test-utils/test-data-source';
import { OrderDirectionEnum } from '../../../../type-utils/enums/order-direction.enum';
import { AdvertisementRepository } from '../../infra/repositories/advertisement.repository';
import { CategoryRepository } from '../../infra/repositories/category.repository';
import { AdvertisementRepositoryModel } from '../../repositories/advertisement-repository.model';
import { CategoryRepositoryModel } from '../../repositories/category-repository.model';
import {
  CreateAdvertisementUseCase,
  ICreateAdvertisementModel,
} from '../createAdvertisement/create-advertisement.use-case';
import { ISearchAdvertisementModel } from './search-advertisement.use-case';

let dataSource: DataSource;
let categoryRepository: CategoryRepositoryModel;
let advertisementRepository: AdvertisementRepositoryModel;
let createAdvertisementUseCase: CreateAdvertisementUseCase;

const searchAdvertisementMutation = `
query SearchAdvertisement($page: Float!, $pageSize: Float!, $searchTerm: String!, $orderColumn: String!, $orderDirection: String!, $categoryId: ID) {

  searchAdvertisement(page: $page, pageSize: $pageSize, searchTerm: $searchTerm, orderColumn: $orderColumn, orderDirection: $orderDirection, categoryId: $categoryId) {
    rows {
      title
    },
    count
  }
}
`;

describe('Search Advertisement Resolver', () => {
  beforeEach(async () => {
    dataSource = await testDataSource();
    categoryRepository = new CategoryRepository(dataSource);
    advertisementRepository = new AdvertisementRepository(dataSource);
    createAdvertisementUseCase = new CreateAdvertisementUseCase(advertisementRepository);
  });

  afterEach(async () => {
    await dataSource.destroy();
  });

  it('should be able to search advertisements', async () => {
    const category = await categoryRepository.findByDescription('Roupas');
    const createAdvertisementModel: ICreateAdvertisementModel = {
      title: 'Casaco Brasil',
      address: 'São Paulo',
      categoryId: category?.id || '',
    };
    const create2ndAdvertisementModel: ICreateAdvertisementModel = {
      title: 'Casaco Argentina',
      address: 'São Paulo',
      categoryId: category?.id || '',
    };
    const create3rdAdvertisementModel: ICreateAdvertisementModel = {
      title: 'Casaco Colombia',
      address: 'São Paulo',
      categoryId: category?.id || '',
    };

    await Promise.all([
      createAdvertisementUseCase.execute(createAdvertisementModel),
      createAdvertisementUseCase.execute(create2ndAdvertisementModel),
      createAdvertisementUseCase.execute(create3rdAdvertisementModel),
    ]);

    const searchAdvertisementModel: ISearchAdvertisementModel = {
      page: 0,
      pageSize: 5,
      searchTerm: 'Casaco',
      orderColumn: 'title',
      orderDirection: OrderDirectionEnum.Asc,
    };

    const response = await gCall({
      source: searchAdvertisementMutation,
      variableValues: {
        ...searchAdvertisementModel,
      },
    });

    expect(response.data?.searchAdvertisement).toBeDefined();
    expect(response.data?.searchAdvertisement.rows).toHaveLength(3);
    expect(response.data?.searchAdvertisement.count).toEqual(3);
  });

  it('should be able to search advertisements with pagination', async () => {
    const category = await categoryRepository.findByDescription('Roupas');
    const createAdvertisementModel: ICreateAdvertisementModel = {
      title: 'Casaco Brasil',
      address: 'São Paulo',
      categoryId: category?.id || '',
    };
    const create2ndAdvertisementModel: ICreateAdvertisementModel = {
      title: 'Camisa',
      address: 'São Paulo',
      categoryId: category?.id || '',
    };
    const create3rdAdvertisementModel: ICreateAdvertisementModel = {
      title: 'Casaco Colombia',
      address: 'São Paulo',
      categoryId: category?.id || '',
    };
    const create4thAdvertisementModel: ICreateAdvertisementModel = {
      title: 'Casaco Estados Unidos',
      address: 'São Paulo',
      categoryId: category?.id || '',
    };

    await Promise.all([
      createAdvertisementUseCase.execute(createAdvertisementModel),
      createAdvertisementUseCase.execute(create2ndAdvertisementModel),
      createAdvertisementUseCase.execute(create3rdAdvertisementModel),
      createAdvertisementUseCase.execute(create4thAdvertisementModel),
    ]);

    const searchAdvertisementModel: ISearchAdvertisementModel = {
      page: 1,
      pageSize: 2,
      searchTerm: 'Casaco',
      orderColumn: 'title',
      orderDirection: OrderDirectionEnum.Asc,
    };

    const response = await gCall({
      source: searchAdvertisementMutation,
      variableValues: {
        ...searchAdvertisementModel,
      },
    });

    expect(response.data?.searchAdvertisement).toBeDefined();
    expect(response.data?.searchAdvertisement.rows).toHaveLength(1);
    expect(response.data?.searchAdvertisement.count).toEqual(3);
  });

  it('should be able to search advertisements with category filter', async () => {
    const category = await categoryRepository.findByDescription('Roupas');
    const category2nd = await categoryRepository.findByDescription('Outros');

    expect(category).toBeDefined();
    expect(category2nd).toBeDefined();

    const createAdvertisementModel: ICreateAdvertisementModel = {
      title: 'Outros',
      address: 'São Paulo',
      categoryId: category2nd!.id,
    };
    const create2ndAdvertisementModel: ICreateAdvertisementModel = {
      title: 'Outros',
      address: 'São Paulo',
      categoryId: category2nd!.id,
    };
    const create3rdAdvertisementModel: ICreateAdvertisementModel = {
      title: 'Casaco Colombia',
      address: 'São Paulo',
      categoryId: category!.id,
    };
    const create4thAdvertisementModel: ICreateAdvertisementModel = {
      title: 'Casaco Estados Unidos',
      address: 'São Paulo',
      categoryId: category!.id,
    };

    await Promise.all([
      createAdvertisementUseCase.execute(createAdvertisementModel),
      createAdvertisementUseCase.execute(create2ndAdvertisementModel),
      createAdvertisementUseCase.execute(create3rdAdvertisementModel),
      createAdvertisementUseCase.execute(create4thAdvertisementModel),
    ]);

    const searchAdvertisementModel: ISearchAdvertisementModel = {
      page: 0,
      pageSize: 2,
      searchTerm: '',
      orderColumn: 'title',
      orderDirection: OrderDirectionEnum.Asc,
      categoryId: category!.id,
    };

    const response = await gCall({
      source: searchAdvertisementMutation,
      variableValues: {
        ...searchAdvertisementModel,
      },
    });

    expect(response.data?.searchAdvertisement).toBeDefined();
    expect(response.data?.searchAdvertisement.rows).toHaveLength(2);
    expect(response.data?.searchAdvertisement.count).toEqual(2);
  });
});
