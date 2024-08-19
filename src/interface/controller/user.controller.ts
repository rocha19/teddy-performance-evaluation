import {
	DeleteUserService,
	GetUserService,
	JwtGuard,
	NewUserService,
	UpdateUserService,
} from "@/application";
import { CreateUserDto, UpdateUserDto } from "@/interface/dto";
import { ParamDTO } from "@/interface/dto/params";
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("User")
@Controller("api/user")
export class UserController {
	constructor(
		private readonly userService: GetUserService,
		private readonly newUserService: NewUserService,
		private readonly updateUserService: UpdateUserService,
		private readonly deleteUserService: DeleteUserService,
	) {}

	@Post()
	@ApiResponse({
		status: 201,
		description: "User has been created successfully.",
	})
	async registerNew(@Body() user: CreateUserDto) {
		return await this.newUserService.execute(user);
	}

	@ApiBearerAuth()
	@UseGuards(JwtGuard)
	@Get(":id")
	@ApiResponse({
		status: 200,
		description: "Find a user by id.",
	})
	async findUserActivity(@Param() param: ParamDTO) {
		const user = await this.userService.execute(param.id);
		return user;
	}

	@ApiBearerAuth()
	@HttpCode(204)
	@UseGuards(JwtGuard)
	@Patch(":id")
	@ApiResponse({
		status: 204,
		description: "No content has send to the client.",
	})
	async update(@Param() param: ParamDTO, @Body() user: UpdateUserDto) {
		return await this.updateUserService.execute(param.id, user);
	}

	@ApiBearerAuth()
	@HttpCode(204)
	@UseGuards(JwtGuard)
	@Delete(":id")
	@ApiResponse({
		status: 204,
		description: "No content has send to the client.",
	})
	async delete(@Param() param: ParamDTO) {
		return await this.deleteUserService.execute(param.id);
	}
}
