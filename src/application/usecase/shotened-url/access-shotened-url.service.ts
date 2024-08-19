import { FileRepository } from "@/application/repository";
import {
	AccessShortUrlAuthenticatedUseCase,
	AccessShortUrlUnauthenticatedUseCase,
} from "@/domain";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AccessShotenedUrlService {
	constructor(
		private jwtService: JwtService,
		private shortenedUrlAuthenticated: AccessShortUrlAuthenticatedUseCase,
		private shortenedUrlUnauthenticated: AccessShortUrlUnauthenticatedUseCase,
	) {
		const repository = new FileRepository();
		this.shortenedUrlUnauthenticated = new AccessShortUrlUnauthenticatedUseCase(
			repository,
		);
	}
	async execute(jwtToken: string, code: string) {
		if (jwtToken) {
			const token = jwtToken.split(" ")[1];
			const decodedToken: Payload = this.jwtService.verify(token);
			if (!decodedToken) {
				throw new Error(`Invalid token JWT: ${token}`);
			}
			return await this.shortenedUrlAuthenticated.execute(code);
		}
		return await this.shortenedUrlUnauthenticated.execute(code);
	}
}

type Payload = {
	sub: string;
	email: string;
	iat: number;
	exp: number;
};
