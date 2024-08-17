import {
	DeleteUserService,
	JwtGuard,
	NewUserService,
	UpdateUserService,
	UserService,
} from "@/application";
import { CreateUserDto, UpdateUserDto } from "@/interface/dto";
import { ParamDTO } from "@/interface/dto/params";
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
	async findUserActivity(@Param() param: ParamDTO) {
		const user = await this.userService.execute(param.id);
		return user;
	}

	@UseGuards(JwtGuard)
	@Patch(":id")
	async update(@Param() param: ParamDTO, @Body() user: UpdateUserDto) {
		return await this.updateUserService.execute(param.id, user);
	}

	@UseGuards(JwtGuard)
	@Delete(":id")
	async delete(@Param() param: ParamDTO) {
		return await this.deleteUserService.execute(param.id);
	}
}
