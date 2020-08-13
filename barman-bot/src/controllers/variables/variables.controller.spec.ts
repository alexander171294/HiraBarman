import { Test, TestingModule } from '@nestjs/testing';
import { VariablesController } from './variables.controller';

describe('Variables Controller', () => {
  let controller: VariablesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VariablesController],
    }).compile();

    controller = module.get<VariablesController>(VariablesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
