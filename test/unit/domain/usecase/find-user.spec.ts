import { User } from "@/domain/entity";
import { Repository } from "@/domain/repository";
import { FindUserByIdUseCase } from "@/domain/usecase";

const repositoryMock: jest.Mocked<Repository<User>> = {
	findById: jest.fn(),
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
} as any;

describe("FindUserByIdUseCase", () => {
	let findUserByIdUseCase: FindUserByIdUseCase;
	let user: User;

	beforeEach(() => {
		findUserByIdUseCase = new FindUserByIdUseCase(repositoryMock);
		user = new User("valid@email.com", "validPassword123");
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("Should successfully find a user by ID", async () => {
		const userId = "userId123";
		repositoryMock.findById.mockResolvedValue(user);

		const result = await findUserByIdUseCase.execute(userId);

		expect(result).toEqual(user);
		expect(repositoryMock.findById).toHaveBeenCalledWith(userId);
		expect(repositoryMock.findById).toHaveBeenCalledTimes(1);
	});

	it("Should throw an error if repository fails", async () => {
		const userId = "userId123";
		const errorMessage = "Repository error";
		repositoryMock.findById.mockRejectedValueOnce(new Error(errorMessage));

		await expect(findUserByIdUseCase.execute(userId)).rejects.toThrow(
			`Error creating user: ${errorMessage}`,
		);
	});
});
