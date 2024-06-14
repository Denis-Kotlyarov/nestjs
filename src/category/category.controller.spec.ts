import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategoryService],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    controller = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return created category', async () => {
    const result = { id: 1, name: 'Новая категория', posts: [] } as Category;
    jest.spyOn(service, 'create').mockImplementation(async () => result);
    const dto = new CreateCategoryDto();
    dto.name = 'Новая категория';
    expect(await controller.create(dto)).toBe(result);
  });

  it('should update category', async () => {
    const result = { id: 1, name: 'Новая категория', posts: [] } as Category;
    jest.spyOn(service, 'create').mockImplementation(async () => result);
    const dto = new CreateCategoryDto();
    dto.name = 'Обновленная категория';
    controller.update('1', dto);
    const updated = controller.findOne('1');
    expect(updated).toStrictEqual({ id: 1, name: 'Обновленная категория' });
  });

  it('should delete category', async () => {
    const result = { id: 1, name: 'Новая категория', posts: [] } as Category;
    jest.spyOn(service, 'create').mockImplementation(async () => result);
    expect(await controller.findOne('1')).toStrictEqual({
      id: 1,
      name: 'Новая категория',
    });
    controller.remove('1');
    expect(await controller.findAll()).toStrictEqual([]);
  });
});
