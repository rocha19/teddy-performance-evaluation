import * as bcrypt from "bcrypt";
import { User } from "../entity";
import { Repository } from "../repository";
import { IjwtService } from "./authentication";

export class Login {
	constructor(
		private jwtService: IjwtService,
		private repository: Repository<User>,
	) {}

	async execute(email: string, password: string) {
		const user = await this.validateCredentials(email, password);
		const payload = {
			sub: user.id,
			email: user.email,
		};
		const token = this.jwtService.sign(payload);

		return token;
	}

	private async validateCredentials(email: string, password: string) {
		const user = await this.repository.findByEmail(email);
		if (!user) {
			throw new Error("Invalid credentials");
		}
		const userIsValid = await bcrypt.compare(password, user.password);
		if (!userIsValid) {
			throw new Error("Invalid credentials");
		}
		return user;
	}
}
