import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Post as postEntity } from './entities/post.entity';

@ApiTags('Posts')
// @ApiBearerAuth()
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiResponse({
    status: 201,
    description: 'Статься успешно создана',
    type: postEntity,
  })
  @ApiResponse({ status: 401, description: 'Неавторизован' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Список статьей получен',
    type: [postEntity],
  })
  // @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @ApiResponse({
    status: 302,
    description: 'Поиск статьи по ID успешен',
    type: postEntity,
  })
  @ApiResponse({ status: 404, description: 'Статья с этим ID не существует' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @ApiResponse({
    status: 201,
    description: 'Статься успешно обновлена',
    type: postEntity,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Статья успешно удалена',
    type: postEntity,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
