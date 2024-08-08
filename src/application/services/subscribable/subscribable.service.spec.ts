import { Test, TestingModule } from '@nestjs/testing';
import { SubscribableService } from './subscribable.service';

describe('SubscribableService', () => {
  let service: SubscribableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscribableService],
    }).compile();

    service = module.get<SubscribableService>(SubscribableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
