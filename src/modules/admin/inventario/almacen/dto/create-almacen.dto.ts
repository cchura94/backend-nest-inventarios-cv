import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAlmacenDto {

  @ApiProperty({
    example: 'Almacén Principal',
    description: 'Nombre del almacén',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @MaxLength(100, {
    message: 'El nombre no puede superar los 100 caracteres.',
  })
  nombre!: string;

  @ApiPropertyOptional({
    example: 'ALM-001',
    description: 'Código interno del almacén',
  })
  @IsOptional()
  @IsString({ message: 'El código debe ser una cadena de texto.' })
  @MaxLength(100, {
    message: 'El código no puede superar los 100 caracteres.',
  })
  codigo?: string;

  @ApiPropertyOptional({
    example: 'Almacén destinado a productos de consumo.',
    description: 'Descripción del almacén',
  })
  @IsOptional()
  @IsString({
    message: 'La descripción debe ser una cadena de texto.',
  })
  descripcion?: string;

  @ApiProperty({
    example: 1,
    description: 'ID de la sucursal a la que pertenece el almacén',
  })
  @IsInt({
    message: 'El ID de la sucursal debe ser un número entero.',
  })
  sucursalId!: number;
}