import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProductoDto {
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Laptop Lenovo ThinkPad E14',
    maxLength: 200,
  })
  @IsString({
    message: 'El nombre debe ser una cadena de texto',
  })
  @IsNotEmpty({
    message: 'El nombre es obligatorio',
  })
  @MaxLength(200, {
    message: 'El nombre no puede superar los 200 caracteres',
  })
  nombre!: string;

  @ApiPropertyOptional({
    description: 'Descripción detallada del producto',
    example:
      'Laptop Lenovo ThinkPad E14 con procesador Intel Core i5 y 16GB de RAM',
  })
  @IsOptional()
  @IsString({
    message: 'La descripción debe ser una cadena de texto',
  })
  descripcion?: string;

  @ApiPropertyOptional({
    description: 'Precio de venta actual del producto',
    example: 1250.50,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message:
        'El precio de venta debe ser un número con máximo 2 decimales',
    },
  )
  @Min(0, {
    message: 'El precio de venta no puede ser negativo',
  })
  precio_venta_actual?: number;

  @ApiPropertyOptional({
    description: 'URL o nombre de archivo de la imagen del producto',
    example: 'productos/laptop-lenovo.jpg',
    maxLength: 255,
  })
  @IsOptional()
  @IsString({
    message: 'La imagen debe ser una cadena de texto',
  })
  @MaxLength(255, {
    message: 'La ruta de la imagen no puede superar los 255 caracteres',
  })
  imagen?: string;

  @ApiProperty({
    description: 'Estado del producto',
    example: true,
  })
  @IsBoolean({
    message: 'El estado debe ser verdadero o falso',
  })
  estado!: boolean;

  @ApiProperty({
    description: 'ID de la categoría a la que pertenece el producto',
    example: 1,
  })
  @IsNumber(
    {},
    {
      message: 'El ID de la categoría debe ser un número',
    },
  )
  @IsNotEmpty()
  categoriaId!: number;
}