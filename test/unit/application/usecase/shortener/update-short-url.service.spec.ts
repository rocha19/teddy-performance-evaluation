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
			const userId = "user-id";
			const shortUrlDto: UpdateShortenedUrlDto = {
				id: "a4a309bf-44f3-488f-9c8f-58f8f08b0a23",
				originalUrl: "http://example.com",
				shortUrl: "http://e.com/123456",
			};

			const shortUrlInstance = new ShortenedUrl(
				shortUrlDto.originalUrl,
				shortUrlDto.shortUrl,
			);

			await service.execute(userId, shortUrlDto);

			expect(updateShortUrlByIdMock.execute).toHaveBeenCalledWith(
				userId,
				shortUrlInstance,
			);
		});
	});
});
