import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class FindProductoDto {
    @ApiProperty({description: 'Número de página', required: false, default: 1})
    @IsOptional()
    page: number = 1;

    @ApiProperty({description: 'Cantidad de productos por página', required: false, default: 10})
    @IsOptional()
    limit: number = 10;

    @ApiProperty({description: 'Filtrar por almacen', required: false})
    @IsOptional()
    @IsString()
    almacen?: number;

    @ApiProperty({ description: 'texto para filtrar', required: false})
    @IsOptional()
    @IsString()
    search: string = '';

    @ApiProperty({description: "filtrar por estado", required: false})
    @IsOptional()
    @IsString()
    estado: boolean = true;
}