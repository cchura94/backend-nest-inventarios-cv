import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class FindAlmacenDto {

  @ApiPropertyOptional({
    example: 1,
    description: 'Filtrar por sucursal',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({
    message: 'El ID de la sucursal debe ser un número entero.',
  })
  sucursalId?: number;
}