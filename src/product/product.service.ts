import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { productsDB } from './entities/product.entity';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  create(createProductDto: CreateProductDto): ProductDto {
    const maxId = Math.max(...productsDB.map((p) => p.id));
    const newProduct: ProductDto = {
      id: maxId + 1,
      name: createProductDto.name,
      description: createProductDto.description,
      price: createProductDto.price,
      isDiscontinued: false,
    };
    productsDB.push(newProduct);
    return newProduct;
  }

  findAll(): ProductDto[] {
    return productsDB;
  }

  findOne(id: number): ProductDto | null {
    return productsDB.find((product) => product.id === id) ?? null;
  }

  update(id: number, updateProductDto: UpdateProductDto): ProductDto | null {
    const index = productsDB.findIndex((product) => product.id === id);
    if (index === -1) return null;

    const updatedProduct = Object.assign(productsDB[index], updateProductDto);
    return updatedProduct;
  }

  remove(id: number): ProductDto | null {
    const productIndex = productsDB.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      return null;
    }
    return productsDB.splice(productIndex, 1)[0];
  }

  removeAll(): ProductDto[] {
    const deletedProducts = productsDB.splice(0);
    if (deletedProducts.length === 0) return [];
    return deletedProducts;
  }
}
