import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from '../entities/sale.entity';
import { CreateSaleDto, UpdateSaleDto } from '../dto/sale.dto';
import { CustomersService } from '../../customers/services/customers.service';
import { VehiclesService } from '../../vehicles/services/vehicles.service';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
    private readonly customersService: CustomersService,
    private readonly vehiclesService: VehiclesService,
  ) {}

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    await this.customersService.findOne(createSaleDto.customer_id);
    await this.vehiclesService.findOne(createSaleDto.vehicle_id);

    const sale = this.saleRepository.create(createSaleDto);
    return await this.saleRepository.save(sale);
  }

  async findAll(): Promise<Sale[]> {
    return await this.saleRepository.find({
      relations: [
        'customer',
        'vehicle',
        'vehicle.model',
        'vehicle.model.brand',
      ],
    });
  }

  async findOne(id: number): Promise<Sale> {
    const sale = await this.saleRepository.findOne({
      where: { id },
      relations: [
        'customer',
        'vehicle',
        'vehicle.model',
        'vehicle.model.brand',
      ],
    });
    if (!sale) {
      throw new NotFoundException(`Venta con id ${id} no encontrada`);
    }
    return sale;
  }

  async update(id: number, updateSaleDto: UpdateSaleDto): Promise<Sale> {
    const sale = await this.findOne(id);

    if (updateSaleDto.customer_id) {
      await this.customersService.findOne(updateSaleDto.customer_id);
    }
    if (updateSaleDto.vehicle_id) {
      await this.vehiclesService.findOne(updateSaleDto.vehicle_id);
    }

    Object.assign(sale, updateSaleDto);
    return await this.saleRepository.save(sale);
  }

  async remove(id: number): Promise<void> {
    const sale = await this.findOne(id);
    await this.saleRepository.remove(sale);
  }
}
