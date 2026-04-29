import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    const product = this.productService.create(createProductDto);
    if (!product) throw new NotFoundException('Product creation failed');
    return product;
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const product = this.productService.findOne(+id);
    if (!product) {
      throw new NotFoundException(`The product with id ${id} was not found`);
    }
    return product;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const product = this.productService.update(+id, updateProductDto);
    if (!product) {
      throw new NotFoundException(`Updating the product with id ${id} failed`);
    }
    return product;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const deletedProduct = this.productService.remove(+id);
    if (!deletedProduct) {
      throw new NotFoundException(`Couldn't delete product with id ${id}`);
    }
    return deletedProduct;
  }

  @Delete()
  removeAll() {
    return this.productService.removeAll();
  }
}
