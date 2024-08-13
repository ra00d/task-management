import {
	ExecutionContext,
	ForbiddenException,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";
import { Request, Response } from "express";

@Injectable()
export class SessionGuard extends AuthGuard("session") {
	constructor(private reflector: Reflector) {
		super();
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		if (isPublic) {
			return true;
		}
		const roles = this.reflector.getAllAndOverride<string[]>("roles", [
			context.getHandler(),
			context.getClass(),
		]);
		const result: boolean = (await super.canActivate(context)) as boolean;
		const req = context.switchToHttp().getRequest<Request>();
		const res = context.switchToHttp().getResponse<Response>();
		const user = req.session?.passport?.user;

		if (user === undefined || user === null) {
			if (process.env.NODE_ENV === "production") {
				res.redirect("/login");
			} else throw new ForbiddenException("You need to login");
		} else if (roles && !roles?.includes(user.role))
			throw new UnauthorizedException("Unauthorized actions");
		req.user = req.session?.passport?.user;
		return result;
	}
}
