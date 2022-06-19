import { AppError } from '../../../../shared/error/app.error';
import { AdvertisementInMemoryRepository } from '../../infra/repositories/in-memory/advertisement-in-memory.repository';
import {
  CreateAdvertisementUseCase,
  ICreateAdvertisementModel,
} from '../createAdvertisement/create-advertisement.use-case';
import {
  UpdateAdvertisementUseCase,
  IUpdateAdvertisementModel,
} from './update-advertisement.use-case';

describe('Update advertisement', () => {
  let advertisementInMemoryRepository: AdvertisementInMemoryRepository;
  let createAdvertisementUseCase: CreateAdvertisementUseCase;
  let updateAdvertisementUseCase: UpdateAdvertisementUseCase;

  beforeEach(() => {
    advertisementInMemoryRepository = new AdvertisementInMemoryRepository();
    createAdvertisementUseCase = new CreateAdvertisementUseCase(advertisementInMemoryRepository);
    updateAdvertisementUseCase = new UpdateAdvertisementUseCase(advertisementInMemoryRepository);
  });

  it('should be able to update a advertisement', async () => {
    const createAdvertisementModel: ICreateAdvertisementModel = {
      address: 'Rua São Clemente 160',
      title: 'Salão de festas',
      categoryId: '1',
      description: '100m com churrasqueira e piscina.',
    };

    const entity = await createAdvertisementUseCase.execute(createAdvertisementModel);

    expect(entity).toBeDefined();

    const updateAdvertisementModel: IUpdateAdvertisementModel = {
      id: entity.id,
      address: 'Rua São Januário',
      title: 'Apartamento',
    };

    await updateAdvertisementUseCase.execute(updateAdvertisementModel);

    const updatedEntity = await advertisementInMemoryRepository.findById(entity.id);

    expect(updatedEntity).toBeDefined();
    expect(updatedEntity!.address).toEqual(updateAdvertisementModel.address);
    expect(updatedEntity!.title).toEqual(updateAdvertisementModel.title);
  });

  it('should not be able to update a non existing advertisement', async () => {
    const findAdvertisementModel: IUpdateAdvertisementModel = {
      id: '__',
      title: 'New title',
    };

    expect(updateAdvertisementUseCase.execute(findAdvertisementModel)).rejects.toEqual(
      new AppError("Entity doesn't exists"),
    );
  });
});
