import { Authentication } from "@/domain";
import { Login } from "@/domain/usecase/login";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService implements Authentication {
	constructor(private login: Login) {}

	async execute(email: string, password: string) {
		const token = await this.login.execute(email, password);
		return token;
	}
}
