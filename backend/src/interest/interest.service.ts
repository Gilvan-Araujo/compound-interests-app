import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class InterestService {
  calculate(
    principal: number,
    rate: number,
    time: number,
    monthlyContribution: number,
    includeContribution: boolean,
  ): number {
    if (principal < 0 || rate < 0 || time < 0 || monthlyContribution < 0) {
      throw new BadRequestException('Os valores não podem ser negativos.');
    }

    let total = principal * Math.pow(1 + rate / 100, time);

    console.log('test1', includeContribution);
    if (includeContribution) {
      console.log('test2', includeContribution, monthlyContribution);
      for (let i = 1; i <= time * 12; i++) {
        total += monthlyContribution * Math.pow(1 + rate / 100 / 12, i);
      }
    }

    return parseFloat(total.toFixed(2));
  }
}
