import { CreateUserUseCase, User } from "@/domain";
import { CreateUserDto } from "@/interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
	constructor(private createUser: CreateUserUseCase) {}
	async execute(user: CreateUserDto): Promise<void> {
		await this.createUser.execute(
			new User(
				user.email,
				user.password,
				user.shortenedUrl,
				user.createdAt,
				user.updatedAt,
			),
		);
	}
}
