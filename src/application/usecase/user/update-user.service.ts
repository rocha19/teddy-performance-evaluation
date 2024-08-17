import { UpdateUserByIdUseCase, User } from "@/domain";
import { UpdateUserDto } from "@/interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UpdateUserService {
	constructor(private updateUserById: UpdateUserByIdUseCase) {}
	async execute(user: UpdateUserDto): Promise<void> {
		const userInstance = new User(user.email, user.password, user.shortenedUrl);
		await this.updateUserById.execute(user.id, userInstance);
	}
}
