import { PrismaUserRepository } from "@/application";
import { ShortenedUrl, User } from "@/domain";
import { PrismaClient } from "@prisma/client";

jest.mock("@prisma/client");

const prismaServiceMock = {
	user: {
		findUnique: jest.fn(),
		create: jest.fn(),
		update: jest.fn(),
		delete: jest.fn(),
		findMany: jest.fn(),
	} as unknown as jest.Mocked<PrismaClient["user"]>,
} as unknown as jest.Mocked<PrismaClient>;

describe("PrismaUserRepository", () => {
	let repository: PrismaUserRepository;
	const userId = "1979cbee-eb71-4b5b-8ee2-f499793bf714";
	const shortenedId = "90c618c2-3e22-4fb3-9e7a-0f12ae7b936f";
	const email = "test@example.com";
	const validOriginalUrl = "http://localhost:8080/api/prisma/users/c44eb1b5";
	const validShortUrl = "http://localhost:8080/123456";
	const validDateTime = new Date().toISOString();
	const user = new User(
		email,
		"hashedPassword",
		[
			new ShortenedUrl(
				validOriginalUrl,
				validShortUrl,
				10,
				userId,
				validDateTime,
				validDateTime,
				false,
				shortenedId,
			),
		],
		validDateTime,
		validDateTime,
		userId,
	);

	beforeEach(() => {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		repository = new PrismaUserRepository(prismaServiceMock as any);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should find a user by ID", async () => {
		const prismaUser = {
			id: userId,
			email,
			password: "hashedPassword",
			createdAt: new Date(validDateTime),
			updatedAt: new Date(validDateTime),
			ShortenedUrl: [
				{
					id: shortenedId,
					originalUrl: validOriginalUrl,
					shortUrl: validShortUrl,
					clickCount: 10,
					userId,
					createdAt: new Date(validDateTime),
					updatedAt: new Date(validDateTime),
					isDeleted: false,
				},
			],
		};

		(prismaServiceMock.user.findUnique as jest.Mock).mockResolvedValue(
			prismaUser,
		);

		const result = await repository.findById(userId);

		expect(result).toEqual(user);
		expect(prismaServiceMock.user.findUnique).toHaveBeenCalledWith({
			where: { id: userId },
			include: { ShortenedUrl: true },
		});
		expect(prismaServiceMock.user.findUnique).toHaveBeenCalledTimes(1);
	});

	it("should create a user", async () => {
		const prismaUserData = {
			id: userId,
			email,
			password: "hashedPassword",
			createdAt: new Date(validDateTime),
			updatedAt: new Date(validDateTime),
			ShortenedUrl: {
				create: [
					{
						id: shortenedId,
						originalUrl: validOriginalUrl,
						shortUrl: validShortUrl,
						clickCount: 10,
						userId,
						createdAt: new Date(validDateTime),
						updatedAt: new Date(validDateTime),
						isDeleted: false,
					},
				],
			},
		};

		(prismaServiceMock.user.create as jest.Mock).mockResolvedValue({});

		await repository.create(user);

		expect(prismaServiceMock.user.create).toHaveBeenCalledWith({
			data: prismaUserData,
		});
		expect(prismaServiceMock.user.create).toHaveBeenCalledTimes(1);
	});

	it("should find a user by email", async () => {
		const prismaUser = {
			id: userId,
			email,
			password: "hashedPassword",
			createdAt: new Date(validDateTime),
			updatedAt: new Date(validDateTime),
			ShortenedUrl: [
				{
					id: shortenedId,
					originalUrl: validOriginalUrl,
					shortUrl: validShortUrl,
					clickCount: 10,
					userId,
					createdAt: new Date(validDateTime),
					updatedAt: new Date(validDateTime),
					isDeleted: false,
				},
			],
		};

		(prismaServiceMock.user.findUnique as jest.Mock).mockResolvedValue(
			prismaUser,
		);

		const result = await repository.findByEmail(email);

		expect(result).toEqual(user);
		expect(prismaServiceMock.user.findUnique).toHaveBeenCalledWith({
			where: { email },
			include: { ShortenedUrl: true },
		});
		expect(prismaServiceMock.user.findUnique).toHaveBeenCalledTimes(1);
	});

	it("should update a user by ID", async () => {
		const updatedUser = new User(
			email,
			"newPassword",
			[],
			validDateTime,
			validDateTime,
			userId,
		);

		await repository.findByIdAndUpdate(userId, {
			email: updatedUser.email,
			password: updatedUser.password,
		});

		expect(prismaServiceMock.user.update).toHaveBeenCalledWith({
			where: { id: userId },
			data: {
				email: updatedUser.email,
				password: updatedUser.password,
				createdAt: undefined,
				updatedAt: undefined,
			},
			include: { ShortenedUrl: true },
		});
		expect(prismaServiceMock.user.update).toHaveBeenCalledTimes(1);
	});

	it("should delete a user by ID", async () => {
		await repository.findByIdAndDelete(userId);

		expect(prismaServiceMock.user.delete).toHaveBeenCalledWith({
			where: { id: userId },
			include: { ShortenedUrl: true },
		});
		expect(prismaServiceMock.user.delete).toHaveBeenCalledTimes(1);
	});

	it("should find all users", async () => {
		const prismaUsers = [
			{
				id: userId,
				email,
				password: "hashedPassword",
				createdAt: new Date(validDateTime),
				updatedAt: new Date(validDateTime),
				ShortenedUrl: [
					{
						id: shortenedId,
						originalUrl: validOriginalUrl,
						shortUrl: validShortUrl,
						clickCount: 10,
						userId,
						createdAt: new Date(validDateTime),
						updatedAt: new Date(validDateTime),
						isDeleted: false,
					},
				],
			},
		];

		(prismaServiceMock.user.findMany as jest.Mock).mockResolvedValue(
			prismaUsers,
		);

		const result = await repository.findAll();

		expect(result).toEqual([user]);
		expect(prismaServiceMock.user.findMany).toHaveBeenCalledWith({
			include: { ShortenedUrl: true },
		});
		expect(prismaServiceMock.user.findMany).toHaveBeenCalledTimes(1);
	});
});
