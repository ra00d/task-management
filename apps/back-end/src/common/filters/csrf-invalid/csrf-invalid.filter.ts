import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	ForbiddenException,
} from "@nestjs/common";
import { Response } from "express";

@Catch(ForbiddenException)
export class CsrfInvalidFilter<T> implements ExceptionFilter {
	catch(exception: T, host: ArgumentsHost) {
		const res = host.switchToHttp().getResponse<Response>();
		return res.status(403).json({
			...exception,
			message: "You are not logged in",
		});
	}
}
