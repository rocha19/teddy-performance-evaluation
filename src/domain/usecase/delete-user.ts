import { User } from "../entity";
import { Repository } from "../repository";

export class DeleteUserByIdUseCase {
	constructor(private repository: Repository<User>) {}

	async execute(userId: string): Promise<void> {
		await this.repository.findByIdAndDelete(userId);
	}
}
