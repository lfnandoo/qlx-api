import { AppError } from '../../../../shared/error/app.error';
import { AdvertisementEntity } from '../../infra/entities/advertisement.entity';
import { AdvertisementRepositoryModel } from '../../repositories/advertisement-repository.model';

interface ICreateAdvertisementModel {
  title: string;
  address: string;
  categoryId: string;
  description?: string;
}

class CreateAdvertisementUseCase {
  constructor(private readonly advertisementRepository: AdvertisementRepositoryModel) {}

  async execute(data: ICreateAdvertisementModel): Promise<AdvertisementEntity> {
    if (!data.title.trim() || !data.categoryId.trim() || !data.address.trim()) {
      throw new AppError('Fill all required fields');
    }
    const entity = await this.advertisementRepository.create(data);

    return entity;
  }
}

export { CreateAdvertisementUseCase, ICreateAdvertisementModel };
