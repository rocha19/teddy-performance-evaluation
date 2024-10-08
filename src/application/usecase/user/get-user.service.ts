import { FindUserByIdUseCase, User } from "@/domain";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetUserService {
	constructor(private FindUserById: FindUserByIdUseCase) {}
	async execute(userId: string): Promise<User> {
		return await this.FindUserById.execute(userId);
	}
}
