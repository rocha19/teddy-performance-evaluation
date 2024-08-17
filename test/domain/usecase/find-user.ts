import { User } from "../entity";
import { Repository } from "../repository";

export class FindUserByIdUseCase {
	constructor(private repository: Repository<User>) {}

	async execute(userId: string): Promise<User> {
		try {
			const user = await this.repository.findById(userId);
			return user;
		} catch (error) {
			throw new Error(`Error creating user: ${error.message}`);
		}
	}
}
