import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { productsDB } from './entities/product.entity';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  create(createProductDto: CreateProductDto): ProductDto {
    const maxId = Math.max(...productsDB.map(p => p.id));
    const newProduct = {
      id: maxId + 1,
      name: createProductDto.name,
      description: createProductDto.description,
      price: createProductDto.price,
      isDiscontinued: false
    };
    productsDB.push(newProduct);
    return newProduct;
  }

  findAll(): ProductDto[] {
    return productsDB;
  }

  findOne(id: number): ProductDto | undefined {
    return productsDB.find(product => product.id === id);
  }

  update(id: number, updateProductDto: UpdateProductDto): ProductDto | undefined {
    const productIndex = productsDB.findIndex(product => product.id === id);
    if (productIndex === -1) {
      return undefined;
    }
    productsDB[productIndex] = { ...productsDB[productIndex], ...updateProductDto };
    return productsDB[productIndex];
  }

  remove(id: number): ProductDto | undefined {
    const productIndex = productsDB.findIndex(product => product.id === id);
    if (productIndex === -1) {
      return undefined;
    }
    return productsDB.splice(productIndex, 1)[0];
  }
}
