import { Arg, Mutation, Resolver } from 'type-graphql';
import { UpdateAdvertisementDTO } from '../../dtos/update-advertisement.dto';
import { AdvertisementEntity } from '../../infra/entities/advertisement.entity';
import { advertisementRepository } from '../../infra/repositories';
import {
  UpdateAdvertisementUseCase,
  IUpdateAdvertisementModel,
} from './update-advertisement.use-case';

@Resolver()
class UpdateAdvertisementResolver {
  private readonly useCase: UpdateAdvertisementUseCase;

  constructor() {
    this.useCase = new UpdateAdvertisementUseCase(advertisementRepository);
  }

  @Mutation(() => AdvertisementEntity)
  async updateAdvertisement(
    @Arg('id') id: string,
    @Arg('data') data: UpdateAdvertisementDTO,
  ): Promise<AdvertisementEntity> {
    const updateAdvertisementModel: IUpdateAdvertisementModel = {
      id,
      ...data,
    };
    const response = await this.useCase.execute(updateAdvertisementModel);

    return response;
  }
}

export { UpdateAdvertisementResolver };
