import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

jest.mock('@nestjs/core', () => ({
  NestFactory: {
    create: jest.fn().mockResolvedValue({
      listen: jest.fn().mockResolvedValue(null),
    }),
  },
}));

describe('Main', () => {
  it('should create the app and listen on the specified port', async () => {
    const app = await NestFactory.create(AppModule);

    expect(NestFactory.create).toHaveBeenCalledWith(AppModule);

    await app.listen(process.env.PORT ?? 3000);
    expect(app.listen).toHaveBeenCalledWith(process.env.PORT ?? 3000);
  });
});
