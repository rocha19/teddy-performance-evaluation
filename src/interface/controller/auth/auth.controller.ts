import { AuthService } from "@/application";
import { Body, Controller, Post } from "@nestjs/common";
import { UserLoginDto } from "../../dto/login";

@Controller("api")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post("login")
	async login(@Body() body: UserLoginDto) {
		return await this.authService.execute(body.email, body.password);
	}
}
