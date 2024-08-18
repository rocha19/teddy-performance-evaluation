import { NewShotenedUrlService } from "@/application";
import {
	NewShortUrlAuthenticatedUseCase,
	NewShortUrlUnauthenticatedUseCase,
} from "@/domain";
import { FullUrlDto } from "@/interface/dto/full-url";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";

describe("NewShotenedUrlService", () => {
	let service: NewShotenedUrlService;
	let jwtServiceMock: Partial<JwtService>;
	let newShortUrlAuthenticatedMock: Partial<NewShortUrlAuthenticatedUseCase>;
	let newShortUrlUnauthenticatedMock: Partial<NewShortUrlUnauthenticatedUseCase>;

	beforeEach(async () => {
		jwtServiceMock = {
			verify: jest.fn().mockReturnValue({
				sub: "4b9095fa-c82c-4370-8bab-3eed037dd434",
				email: "test@example.com",
				iat: 123,
				exp: 456,
			}),
		};

		newShortUrlAuthenticatedMock = {
			execute: jest
				.fn()
				.mockResolvedValue("https://example.com/authenticated-url"),
		};

		newShortUrlUnauthenticatedMock = {
			execute: jest
				.fn()
				.mockResolvedValue("https://example.com/unauthenticated-url"),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				NewShotenedUrlService,
				{ provide: JwtService, useValue: jwtServiceMock },
				{
					provide: NewShortUrlAuthenticatedUseCase,
					useValue: newShortUrlAuthenticatedMock,
				},
				{
					provide: NewShortUrlUnauthenticatedUseCase,
					useValue: newShortUrlUnauthenticatedMock,
				},
			],
		}).compile();

		service = module.get<NewShotenedUrlService>(NewShotenedUrlService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("execute", () => {
		it("should call newShortUrlAuthenticated.execute if token is valid", async () => {
			const jwtToken = "Bearer valid-token";
			const data: FullUrlDto = { url: "http://example.com" };

			const result = await service.execute(jwtToken, data);

			expect(result).toBe("https://example.com/authenticated-url");
			expect(jwtServiceMock.verify).toHaveBeenCalledWith("valid-token");
			expect(newShortUrlAuthenticatedMock.execute).toHaveBeenCalledWith(
				"4b9095fa-c82c-4370-8bab-3eed037dd434",
				data.url,
			);
		});
	});
});
