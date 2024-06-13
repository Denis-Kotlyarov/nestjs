import { Controller, Post, Get, Body } from '@nestjs/common';
// import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ModerationService } from './moderation.service';

// @ApiTags('moderation')
@Controller('moderation')
export class ModerationController {
  constructor(private readonly service: ModerationService) {}

  @Post()
  async create(@Body() data: any) {
    this.service.moderate(parseInt(data.post_id));
    return {
      message: 'Added to the queue!',
    };
  }

  @Get()
  findAll() {
    return this.service.getJobs();
  }
}
