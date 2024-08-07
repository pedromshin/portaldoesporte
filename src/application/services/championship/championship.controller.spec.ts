import { Test, TestingModule } from '@nestjs/testing';
import { ChampionshipController } from './championship.controller';
import { ChampionshipService } from './championship.service';

describe('ChampionshipController', () => {
  let controller: ChampionshipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChampionshipController],
      providers: [ChampionshipService],
    }).compile();

    controller = module.get<ChampionshipController>(ChampionshipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
