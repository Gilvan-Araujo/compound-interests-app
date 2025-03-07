import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from './jwt.auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';

interface RequestWithUser {
  user: any;
  headers: { authorization: string };
}

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtAuthGuard,
        {
          provide: JwtService,
          useValue: {
            verify: jest.fn().mockImplementation((token) => {
              if (token === 'valid.token') return { userId: 1 };
              throw new Error('Invalid token');
            }),
          },
        },
      ],
    }).compile();

    guard = module.get<JwtAuthGuard>(JwtAuthGuard);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('canActivate', () => {
    it('should allow access for a valid token', () => {
      const request: RequestWithUser = {
        headers: { authorization: 'Bearer valid.token' } as any,
        user: null,
      };

      const context: ExecutionContext = {
        switchToHttp: jest
          .fn()
          .mockReturnValue({ getRequest: jest.fn().mockReturnValue(request) }),
      } as any;

      const result = guard.canActivate(context);

      const payload = { userId: 1 };
      expect(result).toBe(true);
      expect(request.user).toEqual(payload);
      expect(jwtService.verify).toHaveBeenCalledWith('valid.token');
    });

    it('should throw UnauthorizedException if no token is provided', () => {
      const request = { headers: {} };
      const context: ExecutionContext = {
        switchToHttp: jest
          .fn()
          .mockReturnValue({ getRequest: jest.fn().mockReturnValue(request) }),
      } as any;

      expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if the token is invalid', () => {
      const request = { headers: { authorization: 'Bearer invalid.token' } };
      const context: ExecutionContext = {
        switchToHttp: jest
          .fn()
          .mockReturnValue({ getRequest: jest.fn().mockReturnValue(request) }),
      } as any;

      expect(() => guard.canActivate(context)).toThrow(
        new UnauthorizedException('Token inválido'),
      );
    });

    it('should throw UnauthorizedException if the token format is incorrect', () => {
      const request = { headers: { authorization: 'invalid.token' } };
      const context: ExecutionContext = {
        switchToHttp: jest
          .fn()
          .mockReturnValue({ getRequest: jest.fn().mockReturnValue(request) }),
      } as any;

      expect(() => guard.canActivate(context)).toThrow(
        new UnauthorizedException('Token não fornecido'),
      );
    });
  });
});
