import { User } from "@/domain/entity";
import { Repository } from "@/domain/repository";
import { DeleteUserByIdUseCase } from "@/domain/usecase";

const repositoryMock: jest.Mocked<Repository<User>> = {
	findByIdAndDelete: jest.fn(),
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
} as any;

describe("DeleteUserByIdUseCase", () => {
	let deleteUserByIdUseCase: DeleteUserByIdUseCase;

	beforeEach(() => {
		deleteUserByIdUseCase = new DeleteUserByIdUseCase(repositoryMock);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("Should successfully delete a user by ID", async () => {
		const userId = "userId123";
		repositoryMock.findByIdAndDelete.mockResolvedValue(undefined);

		await deleteUserByIdUseCase.execute(userId);

		expect(repositoryMock.findByIdAndDelete).toHaveBeenCalledWith(userId);
		expect(repositoryMock.findByIdAndDelete).toHaveBeenCalledTimes(1);
	});

	it("Should throw an error if repository fails", async () => {
		const userId = "userId123";
		const errorMessage = "Repository error";
		repositoryMock.findByIdAndDelete.mockRejectedValueOnce(
			new Error(errorMessage),
		);

		await expect(deleteUserByIdUseCase.execute(userId)).rejects.toThrow(
			errorMessage,
		);
	});
});
