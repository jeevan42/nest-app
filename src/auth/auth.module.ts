import { Module } from '@nestjs/common'; // 👈 Required to define any NestJS module
import { AuthController } from './auth.controller'; // 👈 Auth API routes (e.g. /login, /register)
import { AuthService } from './auth.service'; // 👈 Auth logic lives here
import { JwtModule } from '@nestjs/jwt'; // 👈 Provides JWT functionality (sign, verify)
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  // 👇 Import JwtModule with custom config
  imports: [
    JwtModule.register({
      secret: 'nest_secret',           // 🔐 Secret key to sign/verify tokens (move to .env in real apps)
      signOptions: { expiresIn: '1h' } // ⏳ Token expiry time set to 1 hour
    })
  ],

  // 👇 Controller defines the routes (/register, /login)
  controllers: [AuthController],

  // 👇 Provider injects and makes AuthService usable via DI
  providers: [AuthService, JwtStrategy]
})

// 📦 This file registers everything related to Auth in one module
export class AuthModule { }
