import { Body, Controller, Get, Post } from '@nestjs/common';
import { BrandsService } from '../services/brands.service';
import { CreateBrandDto } from '../dto/brand.dto';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto);
  }

  @Get()
  findAll() {
    return this.brandsService.findAll();
  }
}
