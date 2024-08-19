import { ShortenedUrl, UpdateShortUrlByIdUseCase } from "@/domain";
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
			`${process.env.DOMAIN}/${shortUrl.shortUrl}`,
			shortUrl.clickCount,
			shortUrl.userId,
			shortUrl.createdAt,
			shortUrl.updatedAt,
			shortUrl.isDeleted,
			shortUrl.id,
		);
		await this.updateShortUrlById.execute(userId, userInstance);
	}
}
