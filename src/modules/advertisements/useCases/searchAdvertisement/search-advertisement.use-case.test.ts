import { OrderDirectionEnum } from '../../../../type-utils/enums/order-direction.enum';
import { AdvertisementInMemoryRepository } from '../../infra/repositories/in-memory/advertisement-in-memory.repository';
import {
  CreateAdvertisementUseCase,
  ICreateAdvertisementModel,
} from '../createAdvertisement/create-advertisement.use-case';
import {
  ISearchAdvertisementModel,
  SearchAdvertisementUseCase,
} from './search-advertisement.use-case';

describe('Search advertisement', () => {
  let advertisementInMemoryRepository: AdvertisementInMemoryRepository;
  let createAdvertisementUseCase: CreateAdvertisementUseCase;
  let searchAdvertisementUseCase: SearchAdvertisementUseCase;

  beforeEach(() => {
    advertisementInMemoryRepository = new AdvertisementInMemoryRepository();
    createAdvertisementUseCase = new CreateAdvertisementUseCase(advertisementInMemoryRepository);
    searchAdvertisementUseCase = new SearchAdvertisementUseCase(advertisementInMemoryRepository);
  });

  it('should be able to search advertisements', async () => {
    const createAdvertisementModel: ICreateAdvertisementModel = {
      address: 'São Paulo',
      title: 'Casaco Seleção Brasileira',
      categoryId: '1',
    };
    const create2ndAdvertisementModel: ICreateAdvertisementModel = {
      address: 'São Paulo',
      title: 'Casaco Seleção Argentina',
      categoryId: '1',
    };

    await Promise.all([
      createAdvertisementUseCase.execute(createAdvertisementModel),
      createAdvertisementUseCase.execute(create2ndAdvertisementModel),
    ]);

    const searchAdvertisementModel: ISearchAdvertisementModel = {
      page: 0,
      pageSize: 5,
      orderColumn: 'title',
      orderDirection: OrderDirectionEnum.Asc,
      searchTerm: 'Casaco',
    };

    const { rows, count } = await searchAdvertisementUseCase.execute(searchAdvertisementModel);

    expect(rows).toHaveLength(2);
    expect(count).toEqual(2);
  });

  it('should be able to search advertisements with pagination', async () => {
    const createAdvertisementModel: ICreateAdvertisementModel = {
      address: 'São Paulo',
      title: 'Casaco Seleção Brasileira',
      categoryId: '1',
    };
    const create2ndAdvertisementModel: ICreateAdvertisementModel = {
      address: 'São Paulo',
      title: 'Casaco Seleção Argentina',
      categoryId: '1',
    };
    const create3rdAdvertisementModel: ICreateAdvertisementModel = {
      address: 'São Paulo',
      title: 'Casaco Seleção Alemã',
      categoryId: '1',
    };

    await Promise.all([
      createAdvertisementUseCase.execute(createAdvertisementModel),
      createAdvertisementUseCase.execute(create2ndAdvertisementModel),
      createAdvertisementUseCase.execute(create3rdAdvertisementModel),
    ]);

    const searchAdvertisementModel: ISearchAdvertisementModel = {
      page: 1,
      pageSize: 2,
      orderColumn: 'title',
      orderDirection: OrderDirectionEnum.Asc,
      searchTerm: 'Casaco',
    };

    const { rows, count } = await searchAdvertisementUseCase.execute(searchAdvertisementModel);

    expect(rows).toHaveLength(1);
    expect(count).toEqual(3);
  });
});
