import { User } from "@/domain/entity";
import { Repository } from "@/domain/repository";
import { UpdateUserByIdUseCase } from "@/domain/usecase";

const repositoryMock: jest.Mocked<Repository<User>> = {
	findByIdAndUpdate: jest.fn(),
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
} as any;

describe("UpdateUserByIdUseCase", () => {
	let updateUserByIdUseCase: UpdateUserByIdUseCase;
	let user: User;

	beforeEach(() => {
		updateUserByIdUseCase = new UpdateUserByIdUseCase(repositoryMock);
		user = new User("valid@email.com", "validPassword123");
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("Should successfully update a user by ID", async () => {
		const userId = "userId123";
		repositoryMock.findByIdAndUpdate.mockResolvedValue(undefined);

		await updateUserByIdUseCase.execute(userId, user);

		expect(repositoryMock.findByIdAndUpdate).toHaveBeenCalledWith(userId, user);
		expect(repositoryMock.findByIdAndUpdate).toHaveBeenCalledTimes(1);
	});

	it("Should throw an error if repository fails", async () => {
		const userId = "userId123";
		const errorMessage = "Repository error";
		repositoryMock.findByIdAndUpdate.mockRejectedValueOnce(
			new Error(errorMessage),
		);

		await expect(updateUserByIdUseCase.execute(userId, user)).rejects.toThrow(
			`Error creating user: ${errorMessage}`,
		);
	});
});
