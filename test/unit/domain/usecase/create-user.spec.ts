import { User } from "@/domain/entity";
import { Repository } from "@/domain/repository";
import { CreateUserUseCase } from "@/domain/usecase";
import * as bcrypt from "bcrypt";

jest.mock("bcrypt");

const repositoryMock: jest.Mocked<Repository<User>> = {
	create: jest.fn(),
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
} as any;

describe("CreateUserUseCase", () => {
	let createUserUseCase: CreateUserUseCase;
	let user: User;

	beforeEach(() => {
		createUserUseCase = new CreateUserUseCase(repositoryMock);
		user = new User("valid@email.com", "validPassword123");
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("Should successfully create a user with hashed password", async () => {
		const hashedPassword = "hashedPassword123";
		const salt = "mockSalt";
		(bcrypt.genSalt as jest.Mock).mockResolvedValue(salt);
		(bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

		await createUserUseCase.execute(user);

		const [passwordReceived, saltReceived] = (bcrypt.hash as jest.Mock).mock
			.calls[0];
		expect(passwordReceived).toBe("validPassword123");
		expect(saltReceived).toBe(salt);

		expect(bcrypt.hash).toHaveBeenCalledWith("validPassword123", salt);
		expect(bcrypt.hash).toHaveBeenCalledTimes(1);

		expect(repositoryMock.create).toHaveBeenCalledWith(
			expect.objectContaining({
				email: user.email,
				password: hashedPassword,
			}),
		);
	});

	it("Should throw an error if repository fails", async () => {
		const errorMessage = "Invalid email or password";
		repositoryMock.create.mockRejectedValueOnce(new Error(errorMessage));

		await expect(createUserUseCase.execute(user)).rejects.toThrow(
			`Error creating user: ${errorMessage}`,
		);
	});

	it("Should throw an error if hashing fails", async () => {
		const errorMessage = "Hashing error";
		(bcrypt.hash as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

		await expect(createUserUseCase.execute(user)).rejects.toThrow(
			`Error generating hash: ${errorMessage}`,
		);

		expect(repositoryMock.create).not.toHaveBeenCalled();
	});
});
