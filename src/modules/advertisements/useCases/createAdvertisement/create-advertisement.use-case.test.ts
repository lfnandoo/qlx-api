import { AppError } from '../../../../shared/error/app.error';
import { AdvertisementInMemoryRepository } from '../../infra/repositories/in-memory/advertisement-in-memory.repository';
import {
  CreateAdvertisementUseCase,
  ICreateAdvertisementModel,
} from './create-advertisement.use-case';

describe('Create advertisement', () => {
  let advertisementInMemoryRepository: AdvertisementInMemoryRepository;
  let createAdvertisementUseCase: CreateAdvertisementUseCase;

  beforeEach(() => {
    advertisementInMemoryRepository = new AdvertisementInMemoryRepository();
    createAdvertisementUseCase = new CreateAdvertisementUseCase(advertisementInMemoryRepository);
  });

  it('should be able to create a new advertisement', async () => {
    const createAdvertisementModel: ICreateAdvertisementModel = {
      address: 'Rua São Clemente 160',
      title: 'Salão de festas',
      categoryId: '1',
      description: '100m com churrasqueira e piscina.',
    };

    const entity = await createAdvertisementUseCase.execute(createAdvertisementModel);

    expect(entity).toBeDefined();
  });

  it('should not be able to create a new advertisement with empty fields', async () => {
    const createAdvertisementModel: ICreateAdvertisementModel = {
      address: 'Rua São Clemente 160',
      title: '',
      categoryId: '',
    };

    await expect(createAdvertisementUseCase.execute(createAdvertisementModel)).rejects.toEqual(
      new AppError('Fill all required fields.'),
    );
  });
});
