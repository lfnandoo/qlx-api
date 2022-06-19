import { AppError } from '../../../../shared/error/app.error';
import { AdvertisementEntity } from '../../infra/entities/advertisement.entity';
import { AdvertisementRepositoryModel } from '../../repositories/advertisement-repository.model';

interface IUpdateAdvertisementModel {
  id: string;
  title?: string;
  description?: string;
  address?: string;
  categoryId?: string;
}

class UpdateAdvertisementUseCase {
  constructor(private readonly advertisementRepository: AdvertisementRepositoryModel) {}

  async execute(data: IUpdateAdvertisementModel): Promise<AdvertisementEntity> {
    if (!data.id.trim()) {
      throw new AppError('Fill all required fields');
    }

    const entity = await this.advertisementRepository.findById(data.id);

    if (!entity) {
      throw new AppError("Entity doesn't exists");
    }

    Object.assign(entity, data);

    await this.advertisementRepository.update(entity);

    return entity;
  }
}

export { UpdateAdvertisementUseCase, IUpdateAdvertisementModel };
