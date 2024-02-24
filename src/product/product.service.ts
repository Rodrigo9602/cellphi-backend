import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'mongoose';
import { Product } from './interface/product.interface';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_MODEL') private productModel: Model<Product>,
  ) { }


  async create(createProductDto: CreateProductDto) {
    try {
      // search if product already exists
      const productExists = await this.productModel.exists({
        name: createProductDto.name,
        price: createProductDto.price,
        userId: createProductDto.userId
      });

      if (productExists) {
        throw new ConflictException(`El producto ya está registrado`)
      } else {
        // create object
        const product = new this.productModel({
          ...createProductDto,
          availability: true,
          registerDate: new Date()
        });
        // save
        return product.save();
      }
    } catch (error) {
      return new ConflictException('Ha ocurrido el siguiente error:', error.message);
    }
  }

  async findAll(userId: string) {
    try {
      const products = await this.productModel.find({ userId: userId });

      if (products.length > 0) {
        return products;
      } else {
        throw new NotFoundException('No existen productos registrados para este usuario actualmente');
      }
    } catch (error) {
      return new ConflictException('Ha ocurrido el siguiente error:', error.message);
    }
  }

  async findByFilter(params: any) {
    try {
      switch (params.filter) {
        case 'id':
          const product = await this.productModel.findById(params.data);
          if (product) {
            return product;
          } else {
            throw new NotFoundException(`El producto con id: ${params.data} no está registrado`);
          }

        case 'name':
          const regex = new RegExp(params.data.split(" ").map((word:string) => `(?=.*\\b${word}\\b)`).join("") + ".*", "i");
          const products = await this.productModel.find({
            name: { $regex: regex }
          });
          if (products) {
            return products;
          } else {
            throw new NotFoundException(`No se encontró el producto solicitado`);
          }
      }
    } catch (error) {
      return new ConflictException('Ha ocurrido el siguiente error:', error.message);
    }
  }  


  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const productUpdated = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true });

      if (productUpdated) {
        return productUpdated;
      } else {
        throw new NotFoundException(`El producto con id ${id} no existe`);
      }
    } catch (error) {
      return new ConflictException('Ha ocurrido el siguiente error:', error.message);
    }
  }

  async sellProducts(params: any) {
    let productsUpdated: Array<String> = [];
    let productsNotFound: Array<String> = [];
    try {
      for await (const id of params.ids) {
        let product = await this.productModel.findById(id);
        if (!product) {
          productsNotFound.push(id);
        } else {
          if (product.availability) {
            let productUpdated: Product;
            if (product.stock === 1) {
              productUpdated = await this.productModel.findByIdAndUpdate(id, { $inc: { stock: -1 }, availability: false }, { new: true });
            } else {
              productUpdated = await this.productModel.findByIdAndUpdate(id, { $inc: { stock: -1 } }, { new: true });
            }
            productsUpdated.push(productUpdated.name);
          }
        }
      }
      return {
        message: "Se realizó la venta de los siguientes productos:",
        productsUpdated,
        info: "No se encontró registro de los productos con ids:",
        productsNotFound
      };

    } catch (error) {
      return new ConflictException('Ha ocurrido el siguiente error:', error.message);
    }
  }

  async remove(id: string) {
    try {
      const productDeleted = await this.productModel.findByIdAndDelete(id);

      if (productDeleted) {
        return productDeleted;
      } else {
        throw new NotFoundException(`El producto con id ${id} no existe`);
      }
    } catch (error) {
      return new ConflictException('Ha ocurrido el siguiente error:', error.message);
    }
  }
}
