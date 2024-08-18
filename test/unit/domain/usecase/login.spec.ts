import { User } from "@/domain/entity";
import { Repository } from "@/domain/repository";
import { Login } from "@/domain/usecase";
import { IjwtService } from "@/domain/usecase/authentication";
import * as bcrypt from "bcrypt";

jest.mock("bcrypt");
jest.mock("@/domain/usecase/authentication");

const repositoryMock: jest.Mocked<Repository<User>> = {
	findByEmail: jest.fn(),
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
} as any;

const jwtServiceMock: jest.Mocked<IjwtService> = {
	sign: jest.fn(),
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
} as any;

describe("Login", () => {
	let login: Login;
	let user: User;

	beforeEach(() => {
		login = new Login(jwtServiceMock, repositoryMock);
		user = new User("valid@email.com", "hashedPassword123");
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("Should return a JWT token when credentials are valid", async () => {
		const email = "valid@email.com";
		const password = "validPassword123";
		const token = "jwtToken123";

		repositoryMock.findByEmail.mockResolvedValue(user);
		(bcrypt.compare as jest.Mock).mockResolvedValue(true);
		jwtServiceMock.sign.mockReturnValue(token);

		const result = await login.execute(email, password);

		expect(result).toBe(token);
		expect(repositoryMock.findByEmail).toHaveBeenCalledWith(email);
		expect(repositoryMock.findByEmail).toHaveBeenCalledTimes(1);
		expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
		expect(bcrypt.compare).toHaveBeenCalledTimes(1);
		expect(jwtServiceMock.sign).toHaveBeenCalledWith({
			sub: user.id,
			email: user.email,
		});
		expect(jwtServiceMock.sign).toHaveBeenCalledTimes(1);
	});

	it("Should throw an error if credentials are invalid", async () => {
		const email = "valid@email.com";
		const password = "invalidPassword";
		(bcrypt.compare as jest.Mock).mockResolvedValue(false);

		await expect(login.execute(email, password)).rejects.toThrow(
			"Invalid credentials",
		);

		expect(repositoryMock.findByEmail).toHaveBeenCalledWith(email);
		expect(repositoryMock.findByEmail).toHaveBeenCalledTimes(1);
		expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
		expect(bcrypt.compare).toHaveBeenCalledTimes(1);
		expect(jwtServiceMock.sign).not.toHaveBeenCalled();
	});

	it("Should throw an error if user is not found", async () => {
		const email = "nonexistent@email.com";
		const password = "password123";
		repositoryMock.findByEmail.mockResolvedValue(null);

		await expect(login.execute(email, password)).rejects.toThrow(
			"Invalid credentials",
		);

		expect(repositoryMock.findByEmail).toHaveBeenCalledWith(email);
		expect(repositoryMock.findByEmail).toHaveBeenCalledTimes(1);
		expect(bcrypt.compare).not.toHaveBeenCalled();
		expect(jwtServiceMock.sign).not.toHaveBeenCalled();
	});
});
