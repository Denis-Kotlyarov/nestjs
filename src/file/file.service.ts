import {
  // Post,
  Injectable,
  // UploadedFile,
  // UseInterceptors,
} from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { File as fileEntity } from './entities/file.entity';
import { Repository } from 'typeorm';
import { CreateFileDto } from './dto/create-file.dto';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(fileEntity)
    private repository: Repository<fileEntity>,
  ) {}

  async saveFile(data: CreateFileDto): Promise<fileEntity> {
    const file = this.repository.create(data);
    return this.repository.save(file);
  }
}
