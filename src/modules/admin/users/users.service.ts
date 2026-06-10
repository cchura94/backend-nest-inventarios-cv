import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  estado: boolean
 //  userRepository = inject(Repository<User>)

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){
    this.estado = true;
  }

  create(createUserDto: CreateUserDto) {
    const nuevoUser = this.userRepository.create(createUserDto)
    return this.userRepository.save(nuevoUser);
  }

  findAll() {
    return this.userRepository.find(); // select * from users
  }

  async findOne(id: string) {
    const usuario = await this.userRepository.findOneBy({id: id})
    if(!usuario){
      throw new NotFoundException("El usuario no se encuentra en la BD");
    }
    return usuario;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
