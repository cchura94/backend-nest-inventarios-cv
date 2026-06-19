import { Module } from '@nestjs/common';
import { AlmacenService } from './almacen.service';
import { AlmacenController } from './almacen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sucursal } from '../sucursal/entities/sucursal.entity';
import { Almacen } from './entities/almacen.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sucursal, Almacen])],
  controllers: [AlmacenController],
  providers: [AlmacenService],
})
export class AlmacenModule {}
