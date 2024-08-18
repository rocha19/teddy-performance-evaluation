import { AuthService } from "@/application";
import { Login } from "@/domain/usecase/login";
import { Test, TestingModule } from "@nestjs/testing";

describe("AuthService", () => {
	let service: AuthService;
	let loginMock: Partial<Login>;

	beforeEach(async () => {
		loginMock = {
			execute: jest.fn().mockResolvedValue("mock-token"),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [AuthService, { provide: Login, useValue: loginMock }],
		}).compile();

		service = module.get<AuthService>(AuthService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("execute", () => {
		it("should return a token", async () => {
			const email = "test@example.com";
			const password = "password123";

			const result = await service.execute(email, password);

			expect(result).toBe("mock-token");
			expect(loginMock.execute).toHaveBeenCalledWith(email, password);
		});
	});
});
