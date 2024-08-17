import { DeleteUserByIdUseCase } from "@/domain";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DeleteUserService {
	constructor(private deleteUserById: DeleteUserByIdUseCase) {}
	async execute(userId: string): Promise<void> {
		await this.deleteUserById.execute(userId);
	}
}
