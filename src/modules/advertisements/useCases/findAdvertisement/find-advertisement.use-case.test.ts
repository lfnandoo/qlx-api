import { AppError } from '../../../../shared/error/app.error';
import { AdvertisementInMemoryRepository } from '../../infra/repositories/in-memory/advertisement-in-memory.repository';
import {
  CreateAdvertisementUseCase,
  ICreateAdvertisementModel,
} from '../createAdvertisement/create-advertisement.use-case';
import { FindAdvertisementUseCase, IFindAdvertisementModel } from './find-advertisement.use-case';

describe('Find advertisement', () => {
  let advertisementInMemoryRepository: AdvertisementInMemoryRepository;
  let createAdvertisementUseCase: CreateAdvertisementUseCase;
  let findAdvertisementUseCase: FindAdvertisementUseCase;

  beforeEach(() => {
    advertisementInMemoryRepository = new AdvertisementInMemoryRepository();
    createAdvertisementUseCase = new CreateAdvertisementUseCase(advertisementInMemoryRepository);
    findAdvertisementUseCase = new FindAdvertisementUseCase(advertisementInMemoryRepository);
  });

  it('should be able to find a advertisement', async () => {
    const createAdvertisementModel: ICreateAdvertisementModel = {
      address: 'Rua São Clemente 160',
      title: 'Salão de festas',
      categoryId: '1',
      description: '100m com churrasqueira e piscina.',
    };

    const entity = await createAdvertisementUseCase.execute(createAdvertisementModel);

    expect(entity).toBeDefined();

    const findAdvertisementModel: IFindAdvertisementModel = {
      id: entity.id,
    };

    const entityFinded = await findAdvertisementUseCase.execute(findAdvertisementModel);

    expect(entityFinded).toMatchObject(entity);
  });

  it('should not be able to find a non existing advertisement', async () => {
    const findAdvertisementModel: IFindAdvertisementModel = {
      id: '__',
    };

    const entity = await findAdvertisementUseCase.execute(findAdvertisementModel);

    expect(entity).toBeNull();
  });

  it('should not be able to find a advertisement with empty fields', async () => {
    const findAdvertisementModel: IFindAdvertisementModel = {
      id: '',
    };

    await expect(findAdvertisementUseCase.execute(findAdvertisementModel)).rejects.toEqual(
      new AppError('Fill all required fields.'),
    );
  });
});
