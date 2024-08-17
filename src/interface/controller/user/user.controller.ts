import { JwtGuard, UserService } from "@/application";
import { CreateUserDto } from "@/interface/dto";
import {
	Body,
	Controller,
	Delete,
	Get,
	Patch,
	Post,
	UseGuards,
} from "@nestjs/common";

@Controller("api")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post("register")
	async registerNew(@Body() user: CreateUserDto) {
		return await this.userService.execute(user);
	}

	@UseGuards(JwtGuard)
	@Get("user")
	async findUserActivity() {
		return "urllink";
	}

	@UseGuards(JwtGuard)
	@Patch("user")
	async update() {
		return "urllink";
	}

	@UseGuards(JwtGuard)
	@Delete("user")
	async delete() {
		return "urllink";
	}
}
