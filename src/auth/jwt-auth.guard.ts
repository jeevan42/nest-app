import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGaurd extends AuthGuard('jwt') {
    // Optional override of handleRequest to customize error handling4
    handleRequest(err: Error | null, user: any) {
        if (err || !user) {
            throw err || new UnauthorizedException('Unauthorized');
        }
        return user;
    }
}