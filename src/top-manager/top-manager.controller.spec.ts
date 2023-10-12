import { Test, TestingModule } from '@nestjs/testing';
import { TopManagerController } from './top-manager.controller';

describe('TopManagerController', () => {
  let controller: TopManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopManagerController],
    }).compile();

    controller = module.get<TopManagerController>(TopManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
