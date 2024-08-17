import { User } from "../entity";
import { Repository } from "../repository";

export class UpdateUserByIdUseCase {
	constructor(private repository: Repository<User>) {}

	async execute(userId: string, user: User): Promise<void> {
		try {
			await this.repository.findByIdAndUpdate(userId, user);
		} catch (error) {
			throw new Error(`Error creating user: ${error.message}`);
		}
	}
}
