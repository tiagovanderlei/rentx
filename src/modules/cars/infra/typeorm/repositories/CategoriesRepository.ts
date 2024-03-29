import { getRepository, Repository } from "typeorm";

import { Category } from "../../infra/typeorm/entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    });

    await this.repository.save(category);
  }

  list(): Promise<Category[]> {
    return this.repository.find();
  }

  findByName(name: string): Promise<Category> {
    return this.repository.findOne({ name });
  }
}

export { CategoriesRepository };
