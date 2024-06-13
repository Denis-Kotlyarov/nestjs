/* eslint-disable prettier/prettier */
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { PostModule } from './post/post.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Category } from './category/entities/category.entity';
import { Post } from './post/entities/post.entity';
import { User } from './users/entities/user.entity';
import { File } from './file/entities/file.entity';
import { ModerationModule } from './moderation/moderation.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'MySQL-5.7', //process.env.DB_HOST
      port: 3306,
      username: 'root', //process.env.DB_USER
      password: '', //process.env.DB_PASSWORD
      database: 'test', //process.env.DB_DATABASE
      entities: [Category, User, Post, File],
      synchronize: true,
    }),
    CategoryModule,
    PostModule,
    UsersModule,
    AuthModule,
    FileModule,
    ModerationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
