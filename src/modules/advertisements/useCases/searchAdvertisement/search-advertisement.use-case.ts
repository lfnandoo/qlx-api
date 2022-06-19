import { OrderDirectionEnum } from '../../../../type-utils/enums/order-direction.enum';
import { PaginationResponse } from '../../../../type-utils/interfaces/pagination-response.interface';
import { AdvertisementEntity } from '../../infra/entities/advertisement.entity';
import { AdvertisementRepositoryModel } from '../../repositories/advertisement-repository.model';

interface ISearchAdvertisementModel {
  page: number;
  pageSize: number;
  orderColumn: string;
  orderDirection: OrderDirectionEnum;
  searchTerm: string;
  categoryId?: string;
}

class SearchAdvertisementUseCase {
  constructor(private readonly advertisementRepository: AdvertisementRepositoryModel) {}

  async execute(data: ISearchAdvertisementModel): Promise<PaginationResponse<AdvertisementEntity>> {
    const search = await this.advertisementRepository.search(data);

    return search;
  }
}

export { SearchAdvertisementUseCase, ISearchAdvertisementModel };
