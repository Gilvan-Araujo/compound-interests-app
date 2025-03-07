import { Test, TestingModule } from '@nestjs/testing';
import { InterestController } from './interest.controller';
import { InterestService } from './interest.service';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { HttpStatus } from '@nestjs/common';

jest.mock('./interest.service');
jest.mock('../auth/jwt.auth.guard');

describe('InterestController', () => {
  let controller: InterestController;
  let interestService: InterestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterestController],
      providers: [
        InterestService,
        {
          provide: JwtAuthGuard,
          useValue: {
            canActivate: jest.fn(() => true),
          },
        },
      ],
    }).compile();

    controller = module.get<InterestController>(InterestController);
    interestService = module.get<InterestService>(InterestService);
  });

  describe('calculate', () => {
    it('should calculate the interest correctly with contribution', () => {
      const investmentDto = {
        principal: 1000,
        rate: 5,
        time: 10,
        monthlyContribution: 100,
        includeContribution: true,
      };

      const expectedResult = { result: 1500 };
      jest
        .spyOn(interestService, 'calculate')
        .mockReturnValue(expectedResult.result);

      const result = controller.calculate(investmentDto);

      expect(result).toEqual(expectedResult);

      expect(interestService.calculate).toHaveBeenCalledWith(
        investmentDto.principal,
        investmentDto.rate,
        investmentDto.time,
        investmentDto.monthlyContribution,
        investmentDto.includeContribution,
      );
    });

    it('should calculate the interest correctly without contribution', () => {
      const investmentDto = {
        principal: 1000,
        rate: 5,
        time: 10,
        includeContribution: false,
      };

      const expectedResult = { result: 1200 };
      jest
        .spyOn(interestService, 'calculate')
        .mockReturnValue(expectedResult.result);

      const result = controller.calculate(investmentDto);

      expect(result).toEqual(expectedResult);

      expect(interestService.calculate).toHaveBeenCalledWith(
        investmentDto.principal,
        investmentDto.rate,
        investmentDto.time,
        0,
        investmentDto.includeContribution,
      );
    });

    it('should return 400 if the DTO is invalid', () => {
      const investmentDto = {
        principal: -1000,
        rate: 5,
        time: 10,
        includeContribution: true,
      };

      try {
        controller.calculate(investmentDto);
      } catch (error) {
        expect(error.status).toBe(HttpStatus.BAD_REQUEST);
      }
    });
  });
});
