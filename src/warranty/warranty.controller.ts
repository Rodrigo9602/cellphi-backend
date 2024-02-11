import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WarrantyService } from './warranty.service';
import { CreateWarrantyDto } from './dto/create-warranty.dto';
import { UpdateWarrantyDto } from './dto/update-warranty.dto';

@Controller('warranty')
export class WarrantyController {
  constructor(private readonly warrantyService: WarrantyService) {}

  @Post()
  create(@Body() createWarrantyDto: CreateWarrantyDto) {
    return this.warrantyService.create(createWarrantyDto);
  }

  @Get('findByUser/:userId')
  findAll(@Param('userId') userId: string) {
    return this.warrantyService.findAll(userId);
  }

  @Get('findById/:id')
  findOne(@Param('id') id: string) {
    return this.warrantyService.findById(id);
  }

  @Get('findByClient/:clientId')
  findByClient(@Param('clientId') clientId: string) {
    return this.warrantyService.findByClient(clientId);
  }

  @Post('findByDate')
  findByDate(@Body() params: any) {
    return this.warrantyService.findByDate(params);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWarrantyDto: UpdateWarrantyDto) {
    return this.warrantyService.update(id, updateWarrantyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.warrantyService.remove(id);
  }
}
