import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Model } from 'mongoose';
import { Client } from './interfaces/client.interface'

@Injectable()
export class ClientService {
  constructor(
    @Inject('CLIENT_MODEL') private clientModel: Model<Client>,
  ){ }

  
  async create(createClientDto: CreateClientDto) {
    try {
      // check if client already exists
      const clientExists = await this.clientModel.exists({ci: createClientDto.ci});

      if(clientExists) {
        throw new ConflictException(`El cliente con ci: ${createClientDto.ci} ya existe`);
      } else {
        // creamos al cliente
        const client = new this.clientModel({
          ...createClientDto
        });
         // save user
         return client.save();
      }
    } catch (error) {
      return new ConflictException('Ha ocurrido el siguiente error: ', error.message);
    }
  }

  async findAll(userId:string) {
    
    try {
      let clients = await this.clientModel.find({userId: userId});

      if(clients.length > 0) {
        clients.forEach(client => client.populate('orders'));
        return clients;
      } else {
        throw new NotFoundException('No existen clientes registrados para este usuario');
      }
    } catch (error) {
      return new ConflictException('Ha ocurrido el siguiente error: ', error.message);
    }
  }

  async findOne(id: string ) {
    try {
      const client = await this.clientModel.findById(id);

      if(client) {
        return client.populate('orders');
      } else {
        throw new NotFoundException(`El cliente con id ${id} no existe`);
      }
    } catch (error) {
      return new ConflictException('Ha ocurrido el siguiente error: ', error.message);
    }
  }

  async findByCi(ci:string) {
    console.log(ci);
    try {
      const client = await this.clientModel.findOne({ci: ci});

      if(client) {
        return client.populate('orders');
      } else {
        throw new NotFoundException(`El cliente con ci ${ci} no existe`);
      }
    } catch (error) {
      return new ConflictException('Ha ocurrido el siguiente error: ', error.message);
    }
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    try {
      const clientUpdated = await this.clientModel.findByIdAndUpdate(id, updateClientDto, {new:true});
      if (clientUpdated) {
        const client = await this.clientModel.findById(clientUpdated._id);
        return client.populate('orders');
      } else {
        throw new NotFoundException(`El cliente con id ${id} no existe`);
      }
    } catch (error) {
      return new ConflictException('Ha ocurrido el siguiente error: ', error.message);
    }
  }

  async addOrder(id: string, params: any) {
    
    try {
      const client = this.clientModel.findById(id);
      if (client) {
        let clientsOrders = (await client).orders;        
        clientsOrders.push(params.orderId);        
        const clientUpdated = await this.clientModel.findByIdAndUpdate(id, {orders: clientsOrders}, {new: true});        
        const clientReturned = await this.clientModel.findById(clientUpdated._id);
        
        return clientReturned.populate('orders');
      } else {
        throw new NotFoundException(`El cliente con id ${id} no existe`);
      }
    } catch (error) {
      return new ConflictException('Ha ocurrido el siguiente error: ', error.message);
    }
  }

  async remove(id: string) {
    try {
      const clientDeleted = await this.clientModel.findByIdAndDelete(id);

      if ( clientDeleted) {
        return clientDeleted;
      } else {
        throw new NotFoundException(`El cliente con id ${id} no existe`);
      }
    } catch (error) {
      return new ConflictException('Ha ocurrido el siguiente error: ', error.message);
    }
  }
}
