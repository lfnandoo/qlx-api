import { AdvertisementEntity } from '../infra/entities/advertisement.entity';
import { CreateAdvertisementDTO } from '../dtos/create-advertisement.dto';
import { SearchAdvertisementDTO } from '../dtos/search-advertisement.dto';
import { PaginationResponse } from '../../../type-utils/interfaces/pagination-response.interface';

interface AdvertisementRepositoryModel {
  create(data: CreateAdvertisementDTO): Promise<AdvertisementEntity>;
  update(entity: AdvertisementEntity): Promise<void>;
  findById(id: string): Promise<AdvertisementEntity | null>;
  search(data: SearchAdvertisementDTO): Promise<PaginationResponse<AdvertisementEntity>>;
}

export { AdvertisementRepositoryModel };
