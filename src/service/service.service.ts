import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Model } from 'mongoose';
import { Service } from './interfaces/service.interface';

@Injectable()
export class ServiceService {
  constructor(
    @Inject('SERVICE_MODEL') private serviceModel: Model<Service>,
  ) { }


  async create(createServiceDto: CreateServiceDto) {
    try {
      const service = new this.serviceModel({
        ...createServiceDto,
        price: Number(createServiceDto.price),
        deliveryDate: new Date()
      });

      return service.save();
    } catch (error) {
      return new ConflictException('Ha ocurrido el siguiente error: ', error.message);
    }
  }

  async findOne(id: string) {
    try {
      const service = await this.serviceModel.findById(id);

      if (service) {
        return service;
      } else {
        throw new NotFoundException(`El servicio con id ${id} no existe`);
      }
    } catch (error) {
      return new ConflictException('Ha ocurrido el siguiente error: ', error.message);
    }
  }

  async findByDate(params: any) {
    try {
      const start = new Date(params.date);
      const end = new Date(params.date);
      end.setDate(start.getDate() + 1);
      

      const services = await this.serviceModel.find({
        deliveryDate: {
          $gte: start,
          $lt: end
        }
      });

      if (services.length > 0) {
        return services;
      } else {
        throw new NotFoundException(`No se registraron servicios en la fecha: ${params.date}`);
      }
    } catch (error) {
      return new ConflictException('Ha ocurrido el siguiente error: ', error.message);
    }
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    try {
      const serviceUpdated = await this.serviceModel.findByIdAndUpdate(id, updateServiceDto, { new: true });

      if (serviceUpdated) {
        return serviceUpdated;
      } else {
        throw new NotFoundException(`El servicio con id ${id} no existe`);
      }
    } catch (error) {
      return new ConflictException('Ha ocurrido el siguiente error: ', error.message);
    }
  }

  async remove(id: string) {
    try {
      const serviceDeleted = await this.serviceModel.findByIdAndDelete(id);

      if (serviceDeleted) {
        return serviceDeleted;
      } else {
        throw new NotFoundException(`El servicio con id ${id} no existe`);
      }
    } catch (error) {
      return new ConflictException('Ha ocurrido el siguiente error: ', error.message);
    }
  }
}
