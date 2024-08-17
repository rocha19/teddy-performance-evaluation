import {
	NewShortUrlAuthenticatedUseCase,
	NewShortUrlUnauthenticatedUseCase,
} from "@/domain";
import { FullUrlDto } from "@/interface/dto/full-url";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class NewShotenedUrlService {
	constructor(
		private jwtService: JwtService,
		private shortenedUrlAuthenticated: NewShortUrlAuthenticatedUseCase,
		private shortenedUrlUnauthenticated: NewShortUrlUnauthenticatedUseCase,
	) {
		this.shortenedUrlUnauthenticated = new NewShortUrlUnauthenticatedUseCase();
	}
	async execute(jwtToken: string, data: FullUrlDto) {
		try {
			const token = jwtToken.split(" ")[1];
			const decodedToken: Payload = this.jwtService.verify(token);
			if (!decodedToken) {
				return await this.shortenedUrlUnauthenticated.execute(data.url);
			}
			return await this.shortenedUrlAuthenticated.execute(
				decodedToken.sub,
				data.url,
			);
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
