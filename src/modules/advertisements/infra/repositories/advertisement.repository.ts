import { DataSource, Like, Repository } from 'typeorm';
import { getPaginationProps } from '../../../../shared/typeorm/utils/get-pagination-props';
import { PaginationResponse } from '../../../../type-utils/interfaces/pagination-response.interface';
import { CreateAdvertisementDTO } from '../../dtos/create-advertisement.dto';
import { SearchAdvertisementDTO } from '../../dtos/search-advertisement.dto';
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

  public async update(entity: AdvertisementEntity): Promise<void> {
    await this.repository.save(entity);
  }

  public async search(
    data: SearchAdvertisementDTO,
  ): Promise<PaginationResponse<AdvertisementEntity>> {
    const where = [
      {
        title: Like(`%${data.searchTerm}%`),
        categoryId: data.categoryId,
      },
      {
        description: Like(`%${data.searchTerm}%`),
        categoryId: data.categoryId,
      },
    ];
    console.log(where);
    const pagination = getPaginationProps(data);

    const [rows, count] = await this.repository.findAndCount({
      where,
      ...pagination,
    });

    const response = {
      rows,
      count,
    };

    return response;
  }
}

export { AdvertisementRepository };
