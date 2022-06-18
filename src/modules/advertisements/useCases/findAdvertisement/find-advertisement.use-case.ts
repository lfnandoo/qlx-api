import { AppError } from '../../../../shared/error/app.error';
import { AdvertisementEntity } from '../../infra/entities/advertisement.entity';
import { AdvertisementRepositoryModel } from '../../repositories/advertisement-repository.model';

interface IFindAdvertisementModel {
  id: string;
}

class FindAdvertisementUseCase {
  constructor(private readonly advertisementRepository: AdvertisementRepositoryModel) {}

  async execute(data: IFindAdvertisementModel): Promise<AdvertisementEntity | null> {
    if (!data.id.trim()) {
      throw new AppError('Fill all required fields.');
    }

    const entity = await this.advertisementRepository.findById(data.id);

    return entity;
  }
}

export { FindAdvertisementUseCase, IFindAdvertisementModel };
