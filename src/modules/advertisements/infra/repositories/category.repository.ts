import { DataSource, Repository } from 'typeorm';
import { CategoryRepositoryModel } from '../../repositories/category-repository.model';
import { CategoryEntity } from '../entities/category.entity';

class CategoryRepository implements CategoryRepositoryModel {
  private readonly repository: Repository<CategoryEntity>;

  constructor(appDataSource: DataSource) {
    this.repository = appDataSource.getRepository(CategoryEntity);
  }

  public async findByDescription(description: string): Promise<CategoryEntity | null> {
    const entity = await this.repository.findOne({ where: { description } });

    return entity;
  }
}

export { CategoryRepository };
