import { DeleteShortUrlService } from "@/application";
import { DeleteShortUrlByIdUseCase } from "@/domain";
import { Test, TestingModule } from "@nestjs/testing";

describe("DeleteShortUrlService", () => {
	let service: DeleteShortUrlService;
	let deleteShortUrlByIdMock: Partial<DeleteShortUrlByIdUseCase>;

	beforeEach(async () => {
		deleteShortUrlByIdMock = {
			execute: jest.fn().mockResolvedValue(undefined),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				DeleteShortUrlService,
				{
					provide: DeleteShortUrlByIdUseCase,
					useValue: deleteShortUrlByIdMock,
				},
			],
		}).compile();

		service = module.get<DeleteShortUrlService>(DeleteShortUrlService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("execute", () => {
		it("should call deleteShortUrlById.execute with correct parameters", async () => {
			const userId = "user-id";
			const shortUrlId = "short-url-id";

			await service.execute(userId, shortUrlId);

			expect(deleteShortUrlByIdMock.execute).toHaveBeenCalledWith(
				userId,
				shortUrlId,
			);
		});
	});
});
