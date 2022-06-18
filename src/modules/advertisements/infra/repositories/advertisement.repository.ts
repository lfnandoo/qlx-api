import { DataSource, Repository } from 'typeorm';
import { CreateAdvertisementDTO } from '../../dtos/create-advertisement.dto';
import { AdvertisementRepositoryModel } from '../../repositories/advertisement-repository.model';
import { AdvertisementEntity } from '../entities/advertisement.entity';

class AdvertisementRepository implements AdvertisementRepositoryModel {
  private readonly repository: Repository<AdvertisementEntity>;

  constructor(appDataSource: DataSource) {
    this.repository = appDataSource.getRepository(AdvertisementEntity);
  }

  public async create(data: CreateAdvertisementDTO): Promise<AdvertisementEntity> {
    const instance = new AdvertisementEntity(data);

    await this.repository.insert(instance);

    return instance;
  }

  public async findById(id: string): Promise<AdvertisementEntity | null> {
    const entity = await this.repository.findOne({ where: { id } });

    return entity;
  }
}

export { AdvertisementRepository };
