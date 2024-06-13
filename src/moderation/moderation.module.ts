import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ModerationService } from './moderation.service';
import { ModerationController } from './moderation.controller';
import { ModeratonProcessor } from './moderation.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'moderation',
    }),
  ],
  controllers: [ModerationController],
  providers: [ModerationService, ModeratonProcessor],
})
export class ModerationModule {}
