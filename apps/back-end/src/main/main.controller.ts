import { Controller, Get } from "@nestjs/common";

@Controller()
export class MainController {
	@Get("csrf-token")
	getCsrfToken() {
		return {
			token: "token",
		};
	}
}
