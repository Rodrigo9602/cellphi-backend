import { Test, TestingModule } from '@nestjs/testing';
import { WarrantyController } from './warranty.controller';
import { WarrantyService } from './warranty.service';

describe('WarrantyController', () => {
  let controller: WarrantyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WarrantyController],
      providers: [WarrantyService],
    }).compile();

    controller = module.get<WarrantyController>(WarrantyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
