import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from '../categoria/entities/categoria.entity';

@Injectable()
export class ProductoService {

  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
    @InjectRepository(Categoria)
    private categoriaRepo: Repository<Categoria>
  ){}

  async create(createProductoDto: CreateProductoDto) {
    // verificar si la categoria existe
    const categoria = await this.categoriaRepo.findOne({where: {id: createProductoDto.categoriaId}});
    if(!categoria) throw new NotFoundException('Categoria no encontrada')

    const producto = this.productoRepository.create({...createProductoDto, categoria});
    return this.productoRepository.save(producto);
  }

  async findAll(page: number = 1, limit: number=10, search: string = '', almacen: number = 0, estado: boolean = true) {

    
    const queryBuilder = this.productoRepository.createQueryBuilder('producto')
            .leftJoinAndSelect('producto.almacenes', 'productoAlmacen')
            .leftJoinAndSelect('productoAlmacen.almacen', 'almacen')
            .where('producto.estado = :estado', {estado})

    if(search){
      queryBuilder.andWhere('(producto.nombre ILIKE :search )', {search: `%${search}%`})
    }

    if(almacen && almacen > 0){
      queryBuilder.andWhere('almacen.id = :almacen', {almacen});
    }

    queryBuilder.skip((page-1) * limit).take(limit);

    const [productos, total] = await queryBuilder.getManyAndCount();
    const totalPages = Math.ceil(total/limit);


    return {
      data: productos,
      total,
      limit,
      page,
      totalPages,
      estado,
      almacen, 
      search
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} producto`;
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto`;
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }
}
