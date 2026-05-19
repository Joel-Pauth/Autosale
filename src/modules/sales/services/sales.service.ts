import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from '../entities/sales.entity';
import { CreateSalesDto, UpdateSalesDto } from '../dto/sales.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private readonly salesRepository: Repository<Sale>,
  ) {}
  async create(createSalesDto: CreateSalesDto): Promise<Sale> {
    const sale = this.salesRepository.create(createSalesDto);
    return await this.salesRepository.save(sale);
  }

  async findAll(): Promise<Sale[]> {
    return await this.salesRepository.find({
      relations: ['customer', 'vehicle'],
    });
  }

  async findOne(id: number): Promise<Sale> {
    const sale = await this.salesRepository.findOne({
      where: { id },
      relations: ['customer', 'vehicle'],
    });
    if (!sale) throw new NotFoundException(`Sale with id ${id} not found`);
    return sale;
  }
  async update(id: number, updateSalesDto: UpdateSalesDto): Promise<Sale> {
    const sale = await this.findOne(id);
    Object.assign(sale, updateSalesDto);
    return await this.salesRepository.save(sale);
  }

  async remove(id: number): Promise<Sale> {
    const sale = await this.findOne(id);
    return await this.salesRepository.softRemove(sale);
  }
}
