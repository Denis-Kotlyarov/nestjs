import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  UseInterceptors,
  // UploadedFile,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  CreateCategoryDto,
  CreateCategorySchema,
} from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Category as categoryEntity } from './entities/category.entity';
import { ValidationPipe } from 'src/pipe/validation.pipe';
import { TestInterceptor } from 'src/interceptors/logging.interceptor';
// import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Categorys')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiResponse({
    status: 201,
    description: 'Категория создана успешно',
    type: categoryEntity,
  })
  @UsePipes(new ValidationPipe(CreateCategorySchema))
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Получен список категорий',
    type: [categoryEntity],
  })
  @Get()
  @UseInterceptors(TestInterceptor) //ТЕСТИРУЮ ИНСПЕКТОР, ПРОСТО ВЫВОДИТ РАЗНИЦУ ВО ВРЕМЕНИ ИСПОЛНЕНИЯ
  findAll() {
    return this.categoryService.findAll();
  }

  @ApiResponse({
    status: 302,
    description: 'Найденна категория по ID',
    type: categoryEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Категория с этим ID не существует',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @ApiResponse({
    status: 201,
    description: 'Категория успешно обновлена',
    type: categoryEntity,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Категория успешно удалена',
    type: categoryEntity,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file'))
  // uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   console.log(file);
  // }
}
