import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Sucursal } from './entities/sucursal.entity';
import { CreateSucursalDto } from './dto/create-sucursal.dto';
import { UpdateSucursalDto } from './dto/update-sucursal.dto';

@Injectable()
export class SucursalService {

  constructor(
    @InjectRepository(Sucursal)
    private readonly sucursalRepository: Repository<Sucursal>,
  ) {}

  async create(createSucursalDto: CreateSucursalDto): Promise<Sucursal> {
    const sucursal = this.sucursalRepository.create(createSucursalDto);

    return await this.sucursalRepository.save(sucursal);
  }

  async findAll(): Promise<Sucursal[]> {
    return await this.sucursalRepository.find({
      relations: {
        almacenes: true,
      },
    });
  }

  async findOne(id: number): Promise<Sucursal> {
    const sucursal = await this.sucursalRepository.findOne({
      where: { id },
      relations: {
        almacenes: true,
      },
    });

    if (!sucursal) {
      throw new NotFoundException(
        `No existe una sucursal con ID ${id}`,
      );
    }

    return sucursal;
  }

  async update(
    id: number,
    updateSucursalDto: UpdateSucursalDto,
  ): Promise<Sucursal> {
    const sucursal = await this.findOne(id);

    Object.assign(sucursal, updateSucursalDto);

    return await this.sucursalRepository.save(sucursal);
  }

  async remove(id: number): Promise<void> {
    const sucursal = await this.findOne(id);

    await this.sucursalRepository.remove(sucursal);
  }
}