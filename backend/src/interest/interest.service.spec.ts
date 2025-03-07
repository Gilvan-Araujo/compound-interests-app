import { Test, TestingModule } from '@nestjs/testing';
import { InterestService } from './interest.service';
import { BadRequestException } from '@nestjs/common';

describe('InterestService', () => {
  let service: InterestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InterestService],
    }).compile();

    service = module.get<InterestService>(InterestService);
  });

  describe('calculate', () => {
    it('should calculate the interest correctly without monthly contribution', () => {
      const principal = 1000;
      const rate = 5;
      const time = 10;
      const monthlyContribution = 0;
      const includeContribution = false;

      const result = service.calculate(
        principal,
        rate,
        time,
        monthlyContribution,
        includeContribution,
      );

      const expected = 1628.89;
      expect(result).toBeCloseTo(expected, 2);
    });

    it('should calculate the interest correctly with monthly contribution', () => {
      const principal = 1000;
      const rate = 5;
      const time = 10;
      const monthlyContribution = 100;
      const includeContribution = true;

      const result = service.calculate(
        principal,
        rate,
        time,
        monthlyContribution,
        includeContribution,
      );

      const expected = 17221.82;
      expect(result).toBeCloseTo(expected, 2);
    });

    it('should throw BadRequestException if principal is negative', () => {
      const principal = -1000;
      const rate = 5;
      const time = 10;
      const monthlyContribution = 100;
      const includeContribution = true;

      expect(() =>
        service.calculate(
          principal,
          rate,
          time,
          monthlyContribution,
          includeContribution,
        ),
      ).toThrow(new BadRequestException('Os valores não podem ser negativos.'));
    });

    it('should throw BadRequestException if rate is negative', () => {
      const principal = 1000;
      const rate = -5;
      const time = 10;
      const monthlyContribution = 100;
      const includeContribution = true;

      expect(() =>
        service.calculate(
          principal,
          rate,
          time,
          monthlyContribution,
          includeContribution,
        ),
      ).toThrow(new BadRequestException('Os valores não podem ser negativos.'));
    });

    it('should throw BadRequestException if time is negative', () => {
      const principal = 1000;
      const rate = 5;
      const time = -10;
      const monthlyContribution = 100;
      const includeContribution = true;

      expect(() =>
        service.calculate(
          principal,
          rate,
          time,
          monthlyContribution,
          includeContribution,
        ),
      ).toThrow(new BadRequestException('Os valores não podem ser negativos.'));
    });

    it('should throw BadRequestException if monthlyContribution is negative', () => {
      const principal = 1000;
      const rate = 5;
      const time = 10;
      const monthlyContribution = -100;
      const includeContribution = true;

      expect(() =>
        service.calculate(
          principal,
          rate,
          time,
          monthlyContribution,
          includeContribution,
        ),
      ).toThrow(new BadRequestException('Os valores não podem ser negativos.'));
    });
  });
});
