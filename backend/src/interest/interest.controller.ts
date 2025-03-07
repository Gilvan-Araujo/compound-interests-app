import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';

import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { InterestService } from './interest.service';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

class InvestmentDto {
  @IsNumber()
  principal: number;

  @IsNumber()
  rate: number;

  @IsNumber()
  time: number;

  @IsOptional()
  @IsNumber()
  monthlyContribution?: number = 0;

  @IsBoolean()
  includeContribution: boolean;
}

@Controller('interest')
export class InterestController {
  constructor(private readonly interestService: InterestService) {}

  @Post('calculate')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  calculate(@Body() body: InvestmentDto) {
    return {
      result: this.interestService.calculate(
        body.principal,
        body.rate,
        body.time,
        body.includeContribution ? (body.monthlyContribution ?? 0) : 0,
        body.includeContribution,
      ),
    };
  }
}
