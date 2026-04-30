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
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ProductDto } from './dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiCreatedResponse({ description: "The product has been successfully created", type: ProductDto })
  @ApiBadRequestResponse({ description: "Invalid input data", example: { statusCode: 400, message: "Validation failed", error: "Bad Request" } })
  create(@Body() createProductDto: CreateProductDto) {
    const product = this.productService.create(createProductDto);
    if (!product) throw new NotFoundException('Product creation failed');
    return product;
  }

  @Get()
  @ApiOkResponse({ description: "List of all products", type: [ProductDto] })
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: "The product with the specified ID", type: ProductDto })
  @ApiBadRequestResponse({ description: "Invalid product ID", example: { statusCode: 400, message: "Validation failed", error: "Bad Request" } })
  findOne(@Param('id') id: string) {
    const product = this.productService.findOne(+id);
    if (!product) {
      throw new NotFoundException(`The product with id ${id} was not found`);
    }
    return product;
  }

  @Patch(':id')
  @ApiOkResponse({ description: "The updated product", type: ProductDto })
  @ApiBadRequestResponse({ description: "Invalid product ID or update data", example: { statusCode: 400, message: "Validation failed", error: "Bad Request" } })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const product = this.productService.update(+id, updateProductDto);
    if (!product) {
      throw new NotFoundException(`Updating the product with id ${id} failed`);
    }
    return product;
  }

  @Delete(':id')
  @ApiOkResponse({ description: "The deleted product", type: ProductDto })
  @ApiBadRequestResponse({ description: "Invalid product ID", example: { statusCode: 400, message: "Validation failed", error: "Bad Request" } })
  remove(@Param('id') id: string) {
    const deletedProduct = this.productService.remove(+id);
    if (!deletedProduct) {
      throw new NotFoundException(`Couldn't delete product with id ${id}`);
    }
    return deletedProduct;
  }

  @Delete()
  @ApiOkResponse({ description: "All products have been deleted" })
  removeAll() {
    return this.productService.removeAll();
  }
}
