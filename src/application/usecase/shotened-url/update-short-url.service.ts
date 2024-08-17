import { ShortenedUrl, UpdateShortUrlByIdUseCase, User } from "@/domain";
import { UpdateShortenedUrlDto } from "@/interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UpdateShortUrlService {
	constructor(private updateShortUrlById: UpdateShortUrlByIdUseCase) {}
	async execute(
		userId: string,
		shortUrl: UpdateShortenedUrlDto,
	): Promise<void> {
		const userInstance = new ShortenedUrl(
			shortUrl.originalUrl,
			shortUrl.shortUrl,
		);
		await this.updateShortUrlById.execute(userId, userInstance);
	}
}
