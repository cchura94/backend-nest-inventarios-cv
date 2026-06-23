import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Not, Repository } from 'typeorm';
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

  async findOne(id: number) {
    const producto = await this.productoRepository.findOne({where: {id}});
    if(!producto) throw new NotFoundException('producto no encontrado');

    return producto;
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto`;
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }

  async subirImagen(file: Express.Multer.File, id: number){
    // validar
    const valid = ['image/jpeg', 'image/png', 'image/jpg'];

    if(!valid.includes(file.mimetype)){
      throw new BadRequestException('Formato Invalido');
    }

    // validar el tamaño del archivo
    const maxSize = 20 * 1024 * 1024;

    if(file.size > maxSize){
      throw new BadRequestException('El archivo es muy grande');
    }

    const producto = await this.findOne(id);
    producto.imagen = file.path;
    this.productoRepository.save(producto);

    return {message: 'archivo subido', filepath: file.path}
  }
}
