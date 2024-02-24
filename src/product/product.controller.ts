import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Post('FindByFilter')
  FindByFilter(@Body() params:any) {
    return this.productService.findByFilter(params)
  }

  @Get('findAll/:userId')
  findAll(@Param('userId') userId: string) {
    return this.productService.findAll(userId);
  }


  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }  

  @Patch('sell')
  sellProducts( @Body() params:any) {
    return this.productService.sellProducts( params);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
