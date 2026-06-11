import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
// import * as bcrypt from 'bcrypt'
import bcrypt from "bcrypt"

@Injectable()
export class UsersService {

 //  estado: boolean
 //  userRepository = inject(Repository<User>)

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){
    // this.estado = true;
  }

  async create(createUserDto: CreateUserDto) {
    const { email, name, ...restData } = createUserDto;

    // verificar si ya existe el correo
    const existeEmail = await this.userRepository.findOne({
      where: {email: email}
    });

    if(existeEmail){
      throw new BadRequestException(`El correo "${email}" ya está en uso`)
    }

    // encriptar con bcrypt
     const hashPassword = await bcrypt.hash(restData.password, 12);
     console.log(hashPassword);
     const nuevoUser = this.userRepository.create({
      name,
      email,
      password:hashPassword
     });

     const registradoUser = await this.userRepository.save(nuevoUser);
     const {password, ...resto_datos} = registradoUser;
    return resto_datos;
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

  async findOneByEmail(email: string) {
    const usuario = await this.userRepository.findOneBy({email: email})
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
