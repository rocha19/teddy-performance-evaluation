import { GetUserService } from "@/application";
import { FindUserByIdUseCase, User } from "@/domain";
import { Test, TestingModule } from "@nestjs/testing";

describe("GetUserService", () => {
	let service: GetUserService;
	let findUserByIdMock: Partial<FindUserByIdUseCase>;

	beforeEach(async () => {
		findUserByIdMock = {
			execute: jest
				.fn()
				.mockResolvedValue(new User("test@example.com", "password123")),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				GetUserService,
				{ provide: FindUserByIdUseCase, useValue: findUserByIdMock },
			],
		}).compile();

		service = module.get<GetUserService>(GetUserService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("execute", () => {
		it("should return a user object", async () => {
			const userId = "a63933be-6542-477d-af38-8909f920ad4e";

			const result = await service.execute(userId);

			expect(result).toBeInstanceOf(User);
			expect(findUserByIdMock.execute).toHaveBeenCalledWith(userId);
		});
	});
});
