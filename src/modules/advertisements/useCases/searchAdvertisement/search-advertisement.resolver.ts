import { Args, Query, Resolver } from 'type-graphql';
import { PaginationResponse } from '../../../../type-utils/interfaces/pagination-response.interface';
import { SearchAdvertisementReturnDTO } from '../../dtos/search-advertisement-return.dto';
import { SearchAdvertisementDTO } from '../../dtos/search-advertisement.dto';
import { AdvertisementEntity } from '../../infra/entities/advertisement.entity';
import { advertisementRepository } from '../../infra/repositories';
import { SearchAdvertisementUseCase } from './search-advertisement.use-case';

@Resolver()
class SearchAdvertisementResolver {
  private readonly useCase: SearchAdvertisementUseCase;

  constructor() {
    this.useCase = new SearchAdvertisementUseCase(advertisementRepository);
  }

  @Query(() => SearchAdvertisementReturnDTO)
  async searchAdvertisement(
    @Args() data: SearchAdvertisementDTO,
  ): Promise<PaginationResponse<AdvertisementEntity>> {
    const response = await this.useCase.execute(data);

    return response;
  }
}

export { SearchAdvertisementResolver };
