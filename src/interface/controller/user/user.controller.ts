import {
	DeleteUserService,
	JwtGuard,
	NewUserService,
	UpdateUserService,
	UserService,
} from "@/application";
import { CreateUserDto, UpdateUserDto } from "@/interface/dto";
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
} from "@nestjs/common";

@Controller("api/user")
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly newUserService: NewUserService,
		private readonly updateUserService: UpdateUserService,
		private readonly deleteUserService: DeleteUserService,
	) {}

	@Post()
	async registerNew(@Body() user: CreateUserDto) {
		return await this.newUserService.execute(user);
	}

	@UseGuards(JwtGuard)
	@Get(":id")
	async findUserActivity(@Param() param: { id: string }) {
		const user = await this.userService.execute(param.id);
		return user;
	}

	@UseGuards(JwtGuard)
	@Patch()
	async update(@Body() user: UpdateUserDto) {
		return await this.updateUserService.execute(user);
	}

	@UseGuards(JwtGuard)
	@Delete(":id")
	async delete(@Param() param: { id: string }) {
		return await this.deleteUserService.execute(param.id);
	}
}
