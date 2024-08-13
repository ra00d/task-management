import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";
import { EntityNotFoundError } from "typeorm";

@Catch(EntityNotFoundError)
export class NotFoundFilter implements ExceptionFilter {
	catch(exception: EntityNotFoundError, host: ArgumentsHost) {
		const res = host.switchToHttp().getResponse<Response>();
		return res.status(404).json({
			statusCode: 404,
			message: "Item not found",
		});
	}
}
