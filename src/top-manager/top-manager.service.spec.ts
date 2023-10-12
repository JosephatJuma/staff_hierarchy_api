import { Test, TestingModule } from '@nestjs/testing';
import { TopManagerService } from './top-manager.service';

describe('TopManagerService', () => {
  let service: TopManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopManagerService],
    }).compile();

    service = module.get<TopManagerService>(TopManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
