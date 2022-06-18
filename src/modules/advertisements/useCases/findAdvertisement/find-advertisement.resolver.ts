import { Arg, Query, Resolver } from 'type-graphql';
import { AppError } from '../../../../shared/error/app.error';
import { AdvertisementEntity } from '../../infra/entities/advertisement.entity';
import { advertisementRepository } from '../../infra/repositories';
import { FindAdvertisementUseCase, IFindAdvertisementModel } from './find-advertisement.use-case';

@Resolver()
class FindAdvertisementResolver {
  private readonly useCase: FindAdvertisementUseCase;

  constructor() {
    this.useCase = new FindAdvertisementUseCase(advertisementRepository);
  }

  @Query(() => AdvertisementEntity)
  async findAdvertisement(@Arg('id') id: string): Promise<AdvertisementEntity> {
    const findAdvertisementModel: IFindAdvertisementModel = {
      id,
    };
    const response = await this.useCase.execute(findAdvertisementModel);

    if (!response) {
      throw new AppError("Entity doesn't exists");
    }

    return response;
  }
}

export { FindAdvertisementResolver };
