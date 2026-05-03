import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateVehicleDto } from '../dto/vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from '../entities/vehicle.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  async create(createVehicleDto: CreateVehicleDto) {
    try {
      const vehicle = this.vehicleRepository.create(createVehicleDto);
      await this.vehicleRepository.save(vehicle);
      return vehicle;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al crear el vehículo');
    }
  }

  async findAll() {
    return this.vehicleRepository.find({});
  }
}
