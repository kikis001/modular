import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { ProductsController } from './controllers/products.controller';
import { CategoriesService } from './services/categories.service';
import { ProductsService } from './services/products.service';
import { BrandsService } from './services/brands.service';
import { BrandsController } from './controllers/brands.controller';
import { CategoriesController } from './controllers/categories.controller';
import { Product, ProductSchema } from './entities/product.entity';

@Module({
  imports: [
    // mandamos un array con los esquemas que usará este modulo
    MongooseModule.forFeature([
      // nombre del esquema y el esquema que se usará
      { name: Product.name, schema: ProductSchema }
    ])
  ],
  controllers: [ProductsController, BrandsController, CategoriesController],
  providers: [ProductsService, CategoriesService, BrandsService]
})
export class ProductsModule {}
