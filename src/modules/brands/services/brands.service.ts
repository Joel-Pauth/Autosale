import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from '../entities/brand.entity';
import { Repository } from 'typeorm';
import { CreateBrandDto } from '../dto/brand.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    const brand = this.brandRepository.create(createBrandDto);
    return await this.brandRepository.save(brand);
  }

  async findAll(): Promise<Brand[]> {
    return await this.brandRepository.find();
  }

  async findOne(id: number): Promise<Brand> {
    const brand = await this.brandRepository.findOneBy({ id });
    if (!brand) {
      throw new NotFoundException(`Brand con id ${id} no encontrado`);
    }
    return brand;
  }

  async update() {}

  async remove() {}
}
