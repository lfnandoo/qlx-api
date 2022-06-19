import { CreateAdvertisementDTO } from '../../../dtos/create-advertisement.dto';
import { AdvertisementRepositoryModel } from '../../../repositories/advertisement-repository.model';
import { AdvertisementEntity } from '../../entities/advertisement.entity';

class AdvertisementInMemoryRepository implements AdvertisementRepositoryModel {
  private advertisements: AdvertisementEntity[];

  constructor() {
    this.advertisements = [];
  }

  public async create(data: CreateAdvertisementDTO): Promise<AdvertisementEntity> {
    const instance = new AdvertisementEntity(data);

    this.advertisements.push(instance);

    return instance;
  }

  public async findById(id: string): Promise<AdvertisementEntity | null> {
    const entity = this.advertisements.find((advertisement) => advertisement.id === id) || null;

    return entity;
  }

  public async update(entity: AdvertisementEntity): Promise<void> {
    this.advertisements = this.advertisements.map((advertisement) => {
      if (advertisement.id === entity.id) {
        return entity;
      }

      return advertisement;
    });
  }
}

export { AdvertisementInMemoryRepository };
