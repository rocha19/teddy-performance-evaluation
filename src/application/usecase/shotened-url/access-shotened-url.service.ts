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
		this.shortenedUrlUnauthenticated =
			new AccessShortUrlUnauthenticatedUseCase();
	}
	async execute(jwtToken: string, code: string) {
		try {
			const token = jwtToken.split(" ")[1];
			const decodedToken: Payload = this.jwtService.verify(token);
			if (!decodedToken) {
				return await this.shortenedUrlUnauthenticated.execute(code);
			}
			return await this.shortenedUrlAuthenticated.execute(code);
		} catch (error) {
			console.error("Invalid or expired token:", error.message);
			throw new Error("Invalid or expired token");
		}
	}
}

type Payload = {
	sub: string;
	email: string;
	iat: number;
	exp: number;
};
