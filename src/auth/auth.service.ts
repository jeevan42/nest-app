import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    // 🔧 Dependency injection of JwtService provided by @nestjs/jwt
    // This allows us to use this.jwtService.sign() and .verify() for handling JWTs
    constructor(private jwtService: JwtService) { }

    private users: { id: number; username: string; password: string }[] = [];    // Temp in-memory user store

    async register(dto: RegisterDto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = {
            id: Date.now(),
            username: dto.username,
            password: hashedPassword,
        };
        this.users.push(user);
        return { message: 'User registered successfully' }
    }

    async login(dto: LoginDto) {
        const user = this.users.find((u) => u.username === dto.username);
        if (!user || !(await bcrypt.compare(dto.password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            sub: user.id,
            username: user.username
        };
        const token = this.jwtService.sign(payload)

        return { access_token: token };
    }

    // For protected routes
    async validateUser(userId: number) {
        return this.users.find((u) => u.id === userId);
    }
}
