import { UpdateUserService } from "@/application";
import { UpdateUserByIdUseCase, User } from "@/domain";
import { UpdateUserDto } from "@/interface";
import { Test, TestingModule } from "@nestjs/testing";

describe("UpdateUserService", () => {
	let service: UpdateUserService;
	let updateUserByIdMock: Partial<UpdateUserByIdUseCase>;

	beforeEach(async () => {
		updateUserByIdMock = {
			execute: jest.fn().mockResolvedValue(undefined),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UpdateUserService,
				{ provide: UpdateUserByIdUseCase, useValue: updateUserByIdMock },
			],
		}).compile();

		service = module.get<UpdateUserService>(UpdateUserService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("execute", () => {
		it("should call updateUserById.execute with correct parameters", async () => {
			const userId = "user-id";
			const userDto: UpdateUserDto = {
				email: "test@example.com",
				password: "newpassword123",
			};

			const userInstance = new User(userDto.email, userDto.password);

			await service.execute(userId, userDto);

			expect(updateUserByIdMock.execute).toHaveBeenCalledWith(
				userId,
				userInstance,
			);
		});
	});
});
