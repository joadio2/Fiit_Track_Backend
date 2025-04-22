import { Test, TestingModule } from '@nestjs/testing';
import { RutineController } from './rutine.controller';
import { RutineService } from './rutine.service';

describe('RutineController', () => {
  let controller: RutineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RutineController],
      providers: [RutineService],
    }).compile();

    controller = module.get<RutineController>(RutineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
