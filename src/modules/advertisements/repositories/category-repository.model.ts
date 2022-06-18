import { CategoryEntity } from '../infra/entities/category.entity';

interface CategoryRepositoryModel {
  findByDescription(description: string): Promise<CategoryEntity | null>;
}

export { CategoryRepositoryModel };
