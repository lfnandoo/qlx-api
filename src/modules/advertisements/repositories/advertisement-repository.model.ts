import { AdvertisementEntity } from '../infra/entities/advertisement.entity';
import { CreateAdvertisementDTO } from '../dtos/create-advertisement.dto';

interface AdvertisementRepositoryModel {
  create(data: CreateAdvertisementDTO): Promise<AdvertisementEntity>;
  update(entity: AdvertisementEntity): Promise<void>;
  findById(id: string): Promise<AdvertisementEntity | null>;
}

export { AdvertisementRepositoryModel };
