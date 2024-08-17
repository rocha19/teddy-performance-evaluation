import { FindUserByIdUseCase } from "@/domain";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
	constructor(private FindUserById: FindUserByIdUseCase) {}
	async execute(userId: string): Promise<void> {
		await this.FindUserById.execute(userId);
	}
}
