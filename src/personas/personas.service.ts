import { Injectable } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';

@Injectable()
export class PersonasService {
  personas: any[] = []
  create(createPersonaDto: CreatePersonaDto) {
    this.personas.push(createPersonaDto);
    return 'persona registrada';
  }

  findAll() {
    return this.personas;
  }

  findOne(id: number) {
    return `This action returns a #${id} persona`;
  }

  update(id: number, updatePersonaDto: UpdatePersonaDto) {
    return `This action updates a #${id} persona`;
  }

  remove(id: number) {
    return `This action removes a #${id} persona`;
  }
}
