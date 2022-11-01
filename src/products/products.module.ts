import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { CategoriesService } from './services/categories.service';
import { ProductsService } from './services/products.service';
import { BrandsService } from './services/brands.service';
import { BrandsController } from './controllers/brands.controller';
import { CategoriesController } from './controllers/categories.controller';

@Module({
  controllers: [ProductsController, BrandsController, CategoriesController],
  providers: [ProductsService, CategoriesService, BrandsService]
})
export class ProductsModule {}
