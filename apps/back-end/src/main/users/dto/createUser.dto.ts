import { IsNotEmpty, ValidateIf } from "class-validator";

export class CreateUserDto {
	@IsNotEmpty()
	email: string;
	@IsNotEmpty()
	name: string;
	@IsNotEmpty()
	password: string;
	@IsNotEmpty()
	@ValidateIf((o, v) => o.password === v, {
		message: "password does not match",
	})
	confirmPassword: string;
}
