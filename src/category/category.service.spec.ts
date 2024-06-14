import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('create a category', () => {
      const createCategoryDto = new CreateCategoryDto();
      createCategoryDto.name = 'Новая категория';
      const category = service.create(createCategoryDto);
      expect(category).toStrictEqual({ id: 1, name: 'Новая категория' });
      expect(service.findAll).toHaveLength(1);
    });
  });

  describe('findOne', () => {
    it('find a category', () => {
      const createCategoryDto = new CreateCategoryDto();
      createCategoryDto.name = 'Новая категория';
      const newCategory = service.create(createCategoryDto);
      const category = service.findOne(1);
      expect(category).toBe(newCategory);
    });
  });

  describe('update', () => {
    it('update a category', () => {
      const createCategoryDto = new CreateCategoryDto();
      createCategoryDto.name = 'Новая категория';
      service.create(createCategoryDto);
      service.update(1, { name: 'Hello world' });
      const category = service.findOne(1);
      expect(category).toStrictEqual({ id: 1, name: 'Hello world' });
    });
  });

  describe('delete', () => {
    it('delete a category', () => {
      const createCategoryDto = new CreateCategoryDto();
      createCategoryDto.name = 'Новая категория';
      service.create(createCategoryDto);
      service.remove(1);
      const category = service.findAll();
      expect(category).toStrictEqual([]);
    });
  });
});
