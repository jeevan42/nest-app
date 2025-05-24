import { Body, Req, Controller, Get, Post, UseGuards } from '@nestjs/common'; // 📦 Importing decorators for HTTP methods and request handling
import { AuthService } from './auth.service'; // 🔁 Bringing in the AuthService that holds all the logic
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGaurd } from './jwt-auth.guard';
// 📄 DTOs used for input validation and type safety

@Controller('auth')
// 📌 Base route for this controller → All routes will start with /auth
export class AuthController {
    // 🔧 Dependency injection of AuthService
    constructor(private readonly authService: AuthService) { }

    @Post('register')  // 🔁 POST /auth/register
    register(
        @Body() dto: RegisterDto,
        // 📥 Extracts the full request body and maps it to RegisterDto
        // ✅ Ensures structure like: { username: string, password: string }
    ) {
        return this.authService.register(dto)
        // 🧠 Delegates logic to service → hashes password & stores user
    }
    @Post('login')  // 🔁 POST /auth/login
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto)         // 🔐 Delegates logic to service → validates credentials & returns JWT
    }

    @UseGuards(JwtAuthGaurd)
    @Get('profile')
    getprofile(@Req() req: any) {
        // req.user comes from JwtStrategy's validate()
        return req.user;
    }
}
