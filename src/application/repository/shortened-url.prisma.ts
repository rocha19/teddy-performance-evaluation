import { Repository, ShortenedUrl } from "@/domain";
import { PrismaService } from "../usecase";

export class PrismaShortenedUrlRepository implements Repository<ShortenedUrl> {
	constructor(private prismaService: PrismaService) {}
	async findByEmail(_: string): Promise<ShortenedUrl> {
		throw new Error("Method not implemented.");
	}

	async create(shortenedUrl: ShortenedUrl): Promise<void> {
		await this.prismaService.shortenedUrl.create({
			data: {
				originalUrl: shortenedUrl.originalUrl,
				shortUrl: shortenedUrl.shortUrl,
				clickCount: shortenedUrl.clickCount,
				userId: shortenedUrl.userId,
				isDeleted: shortenedUrl.isDeleted && shortenedUrl.isDeleted,
			},
		});
	}

	async findById(code: string): Promise<ShortenedUrl | null> {
		const shortenedUrl = await this.prismaService.shortenedUrl.findUnique({
			where: {
				shortUrl: code,
			},
		});

		if (shortenedUrl) {
			await this.prismaService.shortenedUrl.update({
				where: {
					shortUrl: code,
				},
				data: {
					clickCount: shortenedUrl.clickCount + 1,
				},
			});
		}

		return shortenedUrl
			? this.mapPrismaShortenedUrlToShortenedUrl(shortenedUrl)
			: null;
	}

	async findByIdAndUpdate(
		userId: string,
		data: Partial<ShortenedUrl>,
	): Promise<void> {
		await this.prismaService.shortenedUrl.update({
			where: {
				id_userId: {
					id: data.id,
					userId: userId,
				},
			},
			data: {
				originalUrl: data.originalUrl,
				shortUrl: data.shortUrl,
				clickCount: data.clickCount,
				createdAt: data.createdAt ? new Date(data.createdAt) : undefined,
				updatedAt: data.updatedAt ? new Date(data.updatedAt) : undefined,
			},
		});
	}

	async findByIdAndDelete(userId: string, id: string): Promise<void> {
		await this.prismaService.shortenedUrl.update({
			where: {
				id_userId: {
					id: id,
					userId: userId,
				},
			},
			data: {
				originalUrl: null,
				shortUrl: null,
				clickCount: null,
				createdAt: null,
				updatedAt: new Date(),
				isDeleted: true,
			},
		});
	}

	async findAll(): Promise<ShortenedUrl[]> {
		const shortenedUrls = await this.prismaService.shortenedUrl.findMany();

		return shortenedUrls.map(this.mapPrismaShortenedUrlToShortenedUrl);
	}

	private mapPrismaShortenedUrlToShortenedUrl(
		prismaShortenedUrl: PrismaShortenedUrl,
	): ShortenedUrl {
		return new ShortenedUrl(
			prismaShortenedUrl.originalUrl,
			prismaShortenedUrl.shortUrl,
			prismaShortenedUrl.clickCount,
			prismaShortenedUrl.userId,
			prismaShortenedUrl.createdAt.toISOString(),
			prismaShortenedUrl.updatedAt.toISOString(),
			prismaShortenedUrl.isDeleted && prismaShortenedUrl.isDeleted,
			prismaShortenedUrl.id,
		);
	}
}

type PrismaShortenedUrl = {
	id: string;
	originalUrl: string;
	shortUrl: string;
	clickCount: number;
	createdAt: Date;
	updatedAt: Date;
	userId?: string;
	isDeleted?: boolean;
};
