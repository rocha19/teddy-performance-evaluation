import { randomUUID } from "node:crypto";
import { UpdateShortUrlService } from "@/application";
import { ShortenedUrl, UpdateShortUrlByIdUseCase } from "@/domain";
import { UpdateShortenedUrlDto } from "@/interface";
import { Test, TestingModule } from "@nestjs/testing";

describe("UpdateShortUrlService", () => {
	let service: UpdateShortUrlService;
	let updateShortUrlByIdMock: Partial<UpdateShortUrlByIdUseCase>;

	beforeEach(async () => {
		updateShortUrlByIdMock = {
			execute: jest.fn().mockResolvedValue(undefined),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UpdateShortUrlService,
				{
					provide: UpdateShortUrlByIdUseCase,
					useValue: updateShortUrlByIdMock,
				},
			],
		}).compile();

		service = module.get<UpdateShortUrlService>(UpdateShortUrlService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("execute", () => {
		it("should call updateShortUrlById.execute with correct parameters", async () => {
			const userId = randomUUID();
			const shortUrlDto: UpdateShortenedUrlDto = {
				id: randomUUID(),
				originalUrl: "http://example.com",
				shortUrl: "123456",
			};

			const shortUrlInstance = new ShortenedUrl(
				shortUrlDto.originalUrl,
				`${process.env.DOMAIN}/${shortUrlDto.shortUrl}`,
				shortUrlDto.clickCount,
				shortUrlDto.userId,
				shortUrlDto.createdAt,
				shortUrlDto.updatedAt,
				shortUrlDto.isDeleted,
				shortUrlDto.id,
			);

			await service.execute(userId, shortUrlDto);

			expect(updateShortUrlByIdMock.execute).toHaveBeenCalledWith(
				userId,
				shortUrlInstance,
			);
		});
	});
});
