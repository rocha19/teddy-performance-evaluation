import { DeleteUserService } from "@/application";
import { DeleteUserByIdUseCase } from "@/domain";
import { Test, TestingModule } from "@nestjs/testing";

describe("DeleteUserService", () => {
	let service: DeleteUserService;
	let deleteUserByIdMock: Partial<DeleteUserByIdUseCase>;

	beforeEach(async () => {
		deleteUserByIdMock = {
			execute: jest.fn().mockResolvedValue(undefined),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				DeleteUserService,
				{ provide: DeleteUserByIdUseCase, useValue: deleteUserByIdMock },
			],
		}).compile();

		service = module.get<DeleteUserService>(DeleteUserService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("execute", () => {
		it("should call deleteUserById.execute with correct parameters", async () => {
			const userId = "user-id";

			await service.execute(userId);

			expect(deleteUserByIdMock.execute).toHaveBeenCalledWith(userId);
		});
	});
});
