import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateWarrantyDto } from './dto/create-warranty.dto';
import { UpdateWarrantyDto } from './dto/update-warranty.dto';
import { Model } from 'mongoose';
import { Warranty } from './interfaces/warranty.interface';

@Injectable()
export class WarrantyService {
  constructor(
    @Inject('WARRANTY_MODEL') private warrantyModel: Model<Warranty>,
  ){ }
  
  async create(createWarrantyDto: CreateWarrantyDto) {
    try {
      // create the object
      const warranty = new this.warrantyModel({
        ...createWarrantyDto,
        emitionDate: new Date()
      });

      return warranty.save();
    } catch (error) {
      return new ConflictException('Ha ocurrido el siguiente error: ', error.message);
    }
  }

  async findAll(userId: string) {
    try {
      const warranties = await this.warrantyModel.find({userId: userId}).populate('productId').populate('clientId');

      if(warranties.length > 0) {              
        return warranties;
      } else {
        throw new NotFoundException(`No existen garantías registradas actualmente`);
      }
    } catch (error) {
      return new ConflictException('Ha ocurrido el siguiente error: ', error.message);
    }
  }

  async findById(id: string) {
    try {
      const warranty = await this.warrantyModel.findById(id).populate('productId').populate('clientId');

      if(warranty) {
        return warranty;
      } else {
        throw new NotFoundException(`La garantía con id: ${id} no existe`);
      }
    } catch (error) {
      return new ConflictException('Ha ocurrido el siguiente error: ', error.message);
    }
  }

  async findByClient(clientId: string) {
    try {
      const warranties = await this.warrantyModel.find({clientId: clientId}).populate('productId').populate('clientId');
      if(warranties.length > 0) {
        return warranties;
      } else {
        throw new NotFoundException(`No existen garantías registradas para este cliente actualmente`);
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

      const warranties = await this.warrantyModel.find({
        emitionDate: {
          $gte: start,
          $lt: end
        }
      }).populate('productId').populate('clientId');
      if(warranties.length > 0) {
        return warranties;
      } else {
        throw new NotFoundException(`No existen garantías registradas en la fecha señalada`);
      }

    } catch (error) {
      return new ConflictException('Ha ocurrido el siguiente error: ', error.message);
    }
  }

  async update(id: string, updateWarrantyDto: UpdateWarrantyDto) {
    try {
      const warrantyUpdated = await this.warrantyModel.findByIdAndUpdate(id, updateWarrantyDto, {new: true});

      if (warrantyUpdated) {
        warrantyUpdated.populate('productId');
        warrantyUpdated.populate('clientId');
        return warrantyUpdated;
      } else {
        throw new NotFoundException(`La garantía con id: ${id} no existe`);
      }
    } catch (error) {
      return new ConflictException('Ha ocurrido el siguiente error: ', error.message);
    }
  }

  async remove(id: string) {
    try {
      const warrantyDeleted = await this.warrantyModel.findByIdAndDelete(id);

      if (warrantyDeleted) {
        return warrantyDeleted;
      } else {
        throw new NotFoundException(`La garantía con id: ${id} no existe`);
      }
    } catch (error) {
      return new ConflictException('Ha ocurrido el siguiente error: ', error.message);
    }
  }
}
