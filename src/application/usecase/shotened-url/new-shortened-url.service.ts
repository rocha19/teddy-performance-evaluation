import { FileRepository } from "@/application/repository";
import {
	NewShortUrlAuthenticatedUseCase,
	NewShortUrlUnauthenticatedUseCase,
} from "@/domain";
import { JwtPayloadDto } from "@/interface";
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
		const repository = new FileRepository();
		this.shortenedUrlUnauthenticated = new NewShortUrlUnauthenticatedUseCase(
			repository,
		);
	}
	async execute(jwtToken: string, data: FullUrlDto) {
		try {
			if (jwtToken) {
				const token = jwtToken.split(" ")[1];
				const decodedToken: JwtPayloadDto = this.jwtService.verify(token);

				return await this.shortenedUrlAuthenticated.execute(
					decodedToken.sub,
					data.url,
				);
			}
			return await this.shortenedUrlUnauthenticated.execute(data.url);
		} catch (error) {
			console.error("Invalid or expired token:", error.message);
			return await this.shortenedUrlUnauthenticated.execute(data.url);
		}
	}
}
