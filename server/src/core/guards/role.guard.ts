import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";

import { ROLES_KEY } from "./rolesAuth.decorator";
import { UsersService } from "../../users/users.service";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private jwtService: JwtService,
                private userService: UsersService,
                private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ])

            if (!requiredRoles) {
                return true;
            }

            const req = context.switchToHttp().getRequest();
            const token = req.headers.authorization.split(' ')[1];

            const userData = this.jwtService.verify(token, {secret: process.env.ACCESS_KEY});

            const user = await this.userService.getUserByEmail(userData.email);

            if (!user) {
                throw new NotFoundException({message: "Token not valid"});
            }

            const isAccess = requiredRoles.includes(user.role);

            if (!isAccess) {
                throw new HttpException("No access", HttpStatus.FORBIDDEN);
            }

            req.user = user;
            return isAccess;
        } catch (e) {
            throw new HttpException("No access", HttpStatus.FORBIDDEN);
        }
    }
}