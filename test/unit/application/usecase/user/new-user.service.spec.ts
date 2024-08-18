import { NewUserService } from "@/application";
import { CreateUserUseCase, User } from "@/domain";
import { CreateUserDto } from "@/interface";
import { Test, TestingModule } from "@nestjs/testing";

describe("NewUserService", () => {
	let service: NewUserService;
	let createUserMock: Partial<CreateUserUseCase>;

	beforeEach(async () => {
		createUserMock = {
			execute: jest.fn().mockResolvedValue(undefined),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				NewUserService,
				{ provide: CreateUserUseCase, useValue: createUserMock },
			],
		}).compile();

		service = module.get<NewUserService>(NewUserService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("execute", () => {
		it("should call createUser.execute with correct parameters", async () => {
			const userDto: CreateUserDto = {
				email: "test@example.com",
				password: "password123",
				shortenedUrl: [],
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};

			await service.execute(userDto);

			const userInstance = new User(
				userDto.email,
				userDto.password,
				userDto.shortenedUrl,
				userDto.createdAt,
				userDto.updatedAt,
			);

			expect(createUserMock.execute).toHaveBeenCalledWith(userInstance);
		});
	});
});
