import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiProperty, ApiQuery } from '@nestjs/swagger';
import { FindProductoDto } from './dto/find-producto.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadDto } from './dto/file-upload.dto';

@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productoService.create(createProductoDto);
  }

  @Get()
  @ApiQuery({name: 'search', required: false, type: String})
  @ApiQuery({name: 'almacen', required: false, type: Number})
  findAll(
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 10,
      @Query('almacen') almacen?: number,
      @Query('search') search?: string,
      @Query('estado') estado: boolean = true) {
    
        return this.productoService.findAll(page, limit, search, almacen, estado);
  }

  // con DTO
  @Get("/lista")
  findAll2(@Query() query: FindProductoDto) {
    return this.productoService.findAll(query.page, query.limit, query.search, query.almacen, query.estado);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productoService.update(+id, updateProductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productoService.remove(+id);
  }

  /*
  @ApiOperation({summary: 'Seleccionar una imagen'})
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Selecciona una imagen',
    type: FileUploadDto
    })
    */
 @Post(':id/actualizar-imagen')
  @UseInterceptors(FileInterceptor('imagen'))
  subirImagen(
    @UploadedFile() 
    file: Express.Multer.File, 
  @Param('id') id: number){
    return this.productoService.subirImagen(file, id);
  }
}
