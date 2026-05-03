import { Module } from '@nestjs/common';
import { ModelsController } from './controllers/models.controller';
import { ModelsService } from './services/models.service';

@Module({
  controllers: [ModelsController],
  providers: [ModelsService],
})
export class ModelsModule {}
