import { Test, TestingModule } from '@nestjs/testing';
import { SubscribableController } from './subscribable.controller';
import { SubscribableService } from './subscribable.service';

describe('SubscribableController', () => {
  let controller: SubscribableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscribableController],
      providers: [SubscribableService],
    }).compile();

    controller = module.get<SubscribableController>(SubscribableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
