import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

jest.mock('bcryptjs');
jest.mock('@nestjs/jwt');

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;

  beforeEach(() => {
    jwtService = new JwtService();
    authService = new AuthService(jwtService);
  });

  describe('hashPassword', () => {
    it('should hash a password correctly', async () => {
      const password = 'password123';
      const hashedPassword = 'hashedPassword123';

      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

      const result = await authService.hashPassword(password);

      expect(result).toBe(hashedPassword);
      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
    });
  });

  describe('validatePassword', () => {
    it('should return true if password is valid', async () => {
      const password = 'password123';
      const hash = 'hashedPassword123';

      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await authService.validatePassword(password, hash);

      expect(result).toBe(true);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hash);
    });

    it('should return false if password is invalid', async () => {
      const password = 'password123';
      const hash = 'hashedPassword123';

      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await authService.validatePassword(password, hash);

      expect(result).toBe(false);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hash);
    });
  });

  describe('generateToken', () => {
    it('should generate a token for a user', () => {
      const userId = 1;
      const token = 'generatedToken123';

      (jwtService.sign as jest.Mock).mockReturnValue(token);

      const result = authService.generateToken(userId);

      expect(result).toBe(token);
      expect(jwtService.sign).toHaveBeenCalledWith({ userId });
    });
  });
});
