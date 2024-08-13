import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	ForbiddenException,
} from "@nestjs/common";

@Catch(ForbiddenException)
export class ForbidenFilter<T> implements ExceptionFilter {
	catch(exception: T, host: ArgumentsHost) {}
}
