import { Test, TestingModule } from '@nestjs/testing';
import { WarrantyService } from './warranty.service';

describe('WarrantyService', () => {
  let service: WarrantyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WarrantyService],
    }).compile();

    service = module.get<WarrantyService>(WarrantyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
