import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateSucursalDto {

  @ApiProperty({
    example: 'Sucursal Central',
    description: 'Nombre de la sucursal',
    maxLength: 100,
  })
  @IsString({
    message: 'El nombre debe ser una cadena de texto.',
  })
  @IsNotEmpty({
    message: 'El nombre de la sucursal es obligatorio.',
  })
  @MaxLength(100, {
    message: 'El nombre no puede superar los 100 caracteres.',
  })
  nombre!: string;

  @ApiProperty({
    example: 'Av. Mariscal Santa Cruz #123',
    description: 'Dirección física de la sucursal',
    maxLength: 255,
  })
  @IsString({
    message: 'La dirección debe ser una cadena de texto.',
  })
  @IsNotEmpty({
    message: 'La dirección es obligatoria.',
  })
  @MaxLength(255, {
    message: 'La dirección no puede superar los 255 caracteres.',
  })
  direccion!: string;

  @ApiProperty({
    example: '+59171234567',
    description: 'Número de teléfono de contacto',
    maxLength: 22,
  })
  @IsString({
    message: 'El teléfono debe ser una cadena de texto.',
  })
  @IsNotEmpty({
    message: 'El teléfono es obligatorio.',
  })
  @MinLength(7, {
    message: 'El teléfono debe tener al menos 7 caracteres.',
  })
  @MaxLength(22, {
    message: 'El teléfono no puede superar los 22 caracteres.',
  })
  telefono!: string;

  @ApiProperty({
    example: 'La Paz',
    description: 'Ciudad donde se encuentra la sucursal',
    maxLength: 255,
  })
  @IsString({
    message: 'La ciudad debe ser una cadena de texto.',
  })
  @IsNotEmpty({
    message: 'La ciudad es obligatoria.',
  })
  @MaxLength(255, {
    message: 'La ciudad no puede superar los 255 caracteres.',
  })
  ciudad!: string;
}