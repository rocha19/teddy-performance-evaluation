import * as bcrypt from "bcrypt";
import { User } from "../entity";
import { Repository } from "../repository";

export class CreateUserUseCase {
	constructor(private repository: Repository<User>) {}

	async execute(user: User): Promise<void> {
		try {
			const hashedPassword = await this.generateHash(user.password);
			user.password = hashedPassword;
			await this.repository.create(user);
		} catch (error) {
			throw new Error(`Error creating user: ${error.message}`);
		}
	}

	private async generateHash(password: string): Promise<string> {
		try {
			const salt = await bcrypt.genSalt(10);
			return await bcrypt.hash(password, salt);
		} catch (error) {
			throw new Error(`Error generating hash: ${error.message}`);
		}
	}
}
