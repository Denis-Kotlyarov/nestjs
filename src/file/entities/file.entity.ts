import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class File {
  @ApiProperty({
    description: 'автоматическое ID',
    type: Number,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Имя файла',
  })
  @Column()
  filename: string;

  @ApiProperty({
    description: 'Тип',
  })
  @Column()
  mimetype: string;

  @ApiProperty({
    description: 'Файл',
  })
  @Column('mediumblob')
  data: Buffer;
}
