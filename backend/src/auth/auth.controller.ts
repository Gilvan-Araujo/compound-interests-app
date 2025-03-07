import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  ConflictException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma.service';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

class RegisterDto {
  @IsEmail({}, { message: 'Email inválido' })
  @Transform(({ value }) => value.trim())
  email: string;

  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  password: string;
}

class LoginDto {
  @IsEmail({}, { message: 'Email inválido' })
  @Transform(({ value }) => value.trim())
  email: string;

  @IsNotEmpty({ message: 'Senha é obrigatória' })
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('register')
  async register(@Body() data: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new ConflictException('Email já cadastrado');
    }

    const hashedPassword = await this.authService.hashPassword(data.password);
    const user = await this.prisma.user.create({
      data: { email: data.email, password: hashedPassword },
    });

    return user;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() data: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (
      !user ||
      !(await this.authService.validatePassword(data.password, user.password))
    ) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    return { token: this.authService.generateToken(user.id) };
  }
}
