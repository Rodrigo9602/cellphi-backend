import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Model } from 'mongoose';
import { Order } from './interfaces/order.interface';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_MODEL') private orderModel: Model<Order>,
  ){ }

  
  async create(createOrderDto: CreateOrderDto) {
    try {
      const order = new this.orderModel({
        ...createOrderDto,
        state: 'recibida'
      });
      return order.save();
    } catch (error) {
      return new ConflictException('Ha ocurrido el siguiente error: ', error.message);
    }
  }

  async findAll(clientId: string) {
    try {
      const orders = await this.orderModel.find({clientId: clientId});

      if(orders.length > 0) {
        orders.forEach(order => order.populate('service'));
        return orders;
      } else {
        throw new NotFoundException(`No se encontraron ordenes para el cliente con id: ${clientId}`);
      }
    } catch (error) {
      return new ConflictException('Ha ocurrido el siguiente error: ', error.message);
    }
  }

  async findOne(id: string) {
    try {
      const order = await this.orderModel.findById(id);

      if(order) {
        return order.populate('service');
      } else {
        throw new NotFoundException(`La orden con id: ${id} no existe`);
      }
    } catch (error) {
      return new ConflictException('Ha ocurrido el siguiente error: ', error.message);
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      const orderUpdated = await this.orderModel.findByIdAndUpdate(id, updateOrderDto, {new: true});

      if(orderUpdated) {
        const order = await this.orderModel.findById(orderUpdated._id);
        return order.populate('service');
      } else {
        throw new NotFoundException(`La orden con id: ${id} no existe`);
      }
    } catch (error) {
      return new ConflictException('Ha ocurrido el siguiente error: ', error.message);
    }
  }

  async addService(id: string, params: any) {
    try {
      const orderUpdated = await this.orderModel.findByIdAndUpdate(id, {service: params.serviceId}, {new: true});
      
      if(orderUpdated) {
        const order = await this.orderModel.findById(orderUpdated._id);
        return order.populate('service');
      } else {
        throw new NotFoundException(`La orden con id: ${id} no existe`);
      }      
    } catch (error) {
      return new ConflictException('Ha ocurrido el siguiente error: ', error.message);
    }
  }

  async remove(id: string) {
    try {
      const orderDeleted = await this.orderModel.findByIdAndDelete(id);

      if(orderDeleted) {
        return orderDeleted;
      } else {
        throw new NotFoundException(`La orden con id: ${id} no existe`);
      }
    } catch (error) {
      return new ConflictException('Ha ocurrido el siguiente error: ', error.message);
    }
  }
}
