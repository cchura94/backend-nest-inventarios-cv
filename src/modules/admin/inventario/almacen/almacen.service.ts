import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlmacenDto } from './dto/create-almacen.dto';
import { UpdateAlmacenDto } from './dto/update-almacen.dto';
import { Repository } from 'typeorm';
import { Almacen } from './entities/almacen.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindAlmacenDto } from './dto/find-almacen.dto';
import { Sucursal } from '../sucursal/entities/sucursal.entity';

@Injectable()
export class AlmacenService {
  constructor(
    @InjectRepository(Almacen) 
    private almacenRepository: Repository<Almacen>,
    @InjectRepository(Sucursal) 
    private sucursalRepository: Repository<Sucursal>
  ){}

  async create(
  createAlmacenDto: CreateAlmacenDto,
): Promise<Almacen> {

  const sucursal = await this.sucursalRepository.findOne({
    where: {
      id: createAlmacenDto.sucursalId,
    },
  });

  if (!sucursal) {
    throw new NotFoundException(
      `No existe una sucursal con ID ${createAlmacenDto.sucursalId}`,
    );
  }

  const almacen = this.almacenRepository.create({
    nombre: createAlmacenDto.nombre,
    codigo: createAlmacenDto.codigo,
    descripcion: createAlmacenDto.descripcion,
    sucursal,
  });

  return this.almacenRepository.save(almacen);
}

  findAll(filter: FindAlmacenDto) {
    const query = this.almacenRepository
    .createQueryBuilder('almacen')
    .leftJoinAndSelect('almacen.sucursal', 'sucursal');

  if (filter.sucursalId) {
    query.andWhere(
      'sucursal.id = :sucursalId',
      { sucursalId: filter.sucursalId },
    );
  }

  return query.getMany();
  }

  async findOne(id: number): Promise<Almacen> {

  const almacen = await this.almacenRepository.findOne({
    where: { id },
    relations: {
      productos: true,
    },
  });

  if (!almacen) {
    throw new NotFoundException(
      `No existe un almacén con ID ${id}`,
    );
  }

  return almacen;
}

  async update(
  id: number,
  updateAlmacenDto: UpdateAlmacenDto,
): Promise<Almacen> {

  const almacen = await this.findOne(id);

  if (updateAlmacenDto.sucursalId) {

    const sucursal = await this.sucursalRepository.findOne({
      where: {
        id: updateAlmacenDto.sucursalId,
      },
    });

    if (!sucursal) {
      throw new NotFoundException(
        `No existe una sucursal con ID ${updateAlmacenDto.sucursalId}`,
      );
    }

    almacen.sucursal = sucursal;
  }

  almacen.nombre =
    updateAlmacenDto.nombre ?? almacen.nombre;

  almacen.codigo =
    updateAlmacenDto.codigo ?? almacen.codigo;

  almacen.descripcion =
    updateAlmacenDto.descripcion ?? almacen.descripcion;

  return await this.almacenRepository.save(almacen);
}

  remove(id: number) {
    return `This action removes a #${id} almacen`;
  }
}
