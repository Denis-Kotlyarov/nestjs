import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { File as fileEntity } from './entities/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([fileEntity])],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
