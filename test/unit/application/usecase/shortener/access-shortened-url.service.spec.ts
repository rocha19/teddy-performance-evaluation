import { AccessShotenedUrlService } from "@/application";
import {
	AccessShortUrlAuthenticatedUseCase,
	AccessShortUrlUnauthenticatedUseCase,
} from "@/domain";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";

describe("AccessShotenedUrlService", () => {
	let service: AccessShotenedUrlService;
	let jwtServiceMock: Partial<JwtService>;
	let accessShortUrlAuthenticatedMock: Partial<AccessShortUrlAuthenticatedUseCase>;
	let accessShortUrlUnauthenticatedMock: Partial<AccessShortUrlUnauthenticatedUseCase>;

	beforeEach(async () => {
		jwtServiceMock = {
			verify: jest.fn().mockReturnValue({
				sub: "dfed819e-636e-4e67-8c3f-c6f7f83e197a",
				email: "test@example.com",
				iat: 123,
				exp: 456,
			}),
		};

		accessShortUrlAuthenticatedMock = {
			execute: jest
				.fn()
				.mockResolvedValue("https://example.com/authenticated-url"),
		};

		accessShortUrlUnauthenticatedMock = {
			execute: jest
				.fn()
				.mockResolvedValue("https://example.com/unauthenticated-url"),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AccessShotenedUrlService,
				{ provide: JwtService, useValue: jwtServiceMock },
				{
					provide: AccessShortUrlAuthenticatedUseCase,
					useValue: accessShortUrlAuthenticatedMock,
				},
				{
					provide: AccessShortUrlUnauthenticatedUseCase,
					useValue: accessShortUrlUnauthenticatedMock,
				},
			],
		}).compile();

		service = module.get<AccessShotenedUrlService>(AccessShotenedUrlService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("execute", () => {
		it("should call shortenedUrlAuthenticated.execute if token is valid", async () => {
			const jwtToken = "Bearer valid-token";
			const code = "short-url-code";

			const result = await service.execute(jwtToken, code);

			expect(result).toBe("https://example.com/authenticated-url");
			expect(jwtServiceMock.verify).toHaveBeenCalledWith("valid-token");
			expect(accessShortUrlAuthenticatedMock.execute).toHaveBeenCalledWith(
				code,
			);
		});
	});
});
