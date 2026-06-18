import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriaService {

  constructor(
    @InjectRepository(Categoria)
    private categoriaRepo: Repository<Categoria>

  ){}

  create(createCategoriaDto: CreateCategoriaDto) {

    const categoria = this.categoriaRepo.create(createCategoriaDto);

    return this.categoriaRepo.save(categoria);
  }

  findAll() {
    return this.categoriaRepo.find();
  }

  async findOne(id: number) {
    const cate = await this.categoriaRepo.findOneBy({id});
    if(!cate) throw new NotFoundException('La Categoria no existe');

    return cate;
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    const categoria = await this.findOne(id);
    this.categoriaRepo.merge(categoria, updateCategoriaDto);
    return this.categoriaRepo.save(categoria);
  }

  async remove(id: number) {
    // const result = await this.categoriaRepo.delete(id);
    // if(result.affected === 0) throw new NotFoundException('La categoria no fue encontrada');
  }
}
