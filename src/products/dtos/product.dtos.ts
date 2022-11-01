import { IsNotEmpty, IsString, IsNumber, IsPositive, IsUrl } from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `product's name`})
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}

// PartialType nos ayuda a que todos las propiedades sean opcionales
export class UpdateProductDto extends PartialType(CreateProductDto) {}
