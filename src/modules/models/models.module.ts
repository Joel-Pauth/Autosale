import { Module } from '@nestjs/common';
import { ModelsController } from './controllers/models.controller';
import { ModelsService } from './services/models.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleModel } from './entities/vehicle-model.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleModel])],
  controllers: [ModelsController],
  providers: [ModelsService],
})
export class ModelsModule {}
