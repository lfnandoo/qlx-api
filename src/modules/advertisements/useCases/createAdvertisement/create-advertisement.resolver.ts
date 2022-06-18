import { Arg, Mutation, Resolver } from 'type-graphql';
import { CreateAdvertisementDTO } from '../../dtos/create-advertisement.dto';
import { AdvertisementEntity } from '../../infra/entities/advertisement.entity';
import { advertisementRepository } from '../../infra/repositories';
import { CreateAdvertisementUseCase } from './create-advertisement.use-case';

@Resolver()
class CreateAdvertisementResolver {
  private readonly useCase: CreateAdvertisementUseCase;

  constructor() {
    this.useCase = new CreateAdvertisementUseCase(advertisementRepository);
  }

  @Mutation(() => AdvertisementEntity)
  async createAdvertisement(
    @Arg('data') data: CreateAdvertisementDTO,
  ): Promise<AdvertisementEntity> {
    const response = await this.useCase.execute(data);

    return response;
  }
}

export { CreateAdvertisementResolver };
