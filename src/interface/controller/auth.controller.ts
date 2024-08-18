import { AuthService } from "@/application";
import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { UserLoginDto } from "../dto";

@Controller("api")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post("login")
	@HttpCode(200)
	async login(@Body() body: UserLoginDto) {
		const result = await this.authService.execute(body.email, body.password);
		return result;
	}
}
