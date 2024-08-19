import { AuthService } from "@/application";
import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserLoginDto } from "../dto";

@ApiBearerAuth()
@ApiTags("Login")
@Controller("api")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post("login")
	@ApiResponse({
		status: 200,
		description: "Login successfully",
	})
	@HttpCode(200)
	async login(@Body() body: UserLoginDto) {
		const result = await this.authService.execute(body.email, body.password);
		return result;
	}
}
