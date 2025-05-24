import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            // Extract JWT token from Authorization header as a Bearer token
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // Do not allow expired tokens
            ignoreExpiration: false,
            // Secret key to validate JWT signature (should be in .env file in real projects)
            secretOrKey: 'nest_secret',
        });
    }

    // This method runs after successful token validation.
    // The returned object will be attached to the request object (req.user)
    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username }
    }
}