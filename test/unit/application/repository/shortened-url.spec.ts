import { randomUUID } from "node:crypto";
import { PrismaShortenedUrlRepository } from "@/application";
import { ShortenedUrl } from "@/domain";
import { PrismaClient } from "@prisma/client";

jest.mock("@prisma/client");

const prismaServiceMock = {
	shortenedUrl: {
		findUnique: jest.fn(),
		create: jest.fn(),
		update: jest.fn(),
		findMany: jest.fn(),
	} as unknown as jest.Mocked<PrismaClient["shortenedUrl"]>,
} as unknown as jest.Mocked<PrismaClient>;

describe("PrismaShortenedUrlRepository", () => {
	let repository: PrismaShortenedUrlRepository;
	const userId = "62afe590-a1c5-44c9-83a0-5b5ccd1c23bf";
	const shortenedId = "713f043f-a1a4-4781-b246-572d6235435a";
	const validDateTime = new Date().toISOString();
	const shortenedUrl = new ShortenedUrl(
		"https://example.com",
		"http://localhost:8080/123456",
		10,
		userId,
		validDateTime,
		validDateTime,
		false,
		shortenedId,
	);

	beforeEach(() => {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		repository = new PrismaShortenedUrlRepository(prismaServiceMock as any);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should create a shortened URL", async () => {
		(prismaServiceMock.shortenedUrl.create as jest.Mock).mockResolvedValue({});

		await repository.create(shortenedUrl);

		expect(prismaServiceMock.shortenedUrl.create).toHaveBeenCalledWith({
			data: {
				originalUrl: shortenedUrl.originalUrl,
				shortUrl: shortenedUrl.shortUrl.split("/")[3],
				clickCount: shortenedUrl.clickCount,
				userId: shortenedUrl.userId,
				isDeleted: shortenedUrl.isDeleted,
			},
		});
		expect(prismaServiceMock.shortenedUrl.create).toHaveBeenCalledTimes(1);
	});

	it("should find a shortened URL by ID and update clickCount", async () => {
		const prismaShortenedUrl = {
			id: shortenedId,
			originalUrl: shortenedUrl.originalUrl,
			shortUrl: shortenedUrl.shortUrl.split("/")[3],
			clickCount: shortenedUrl.clickCount,
			userId: shortenedUrl.userId,
			createdAt: new Date(validDateTime),
			updatedAt: new Date(validDateTime),
			isDeleted: shortenedUrl.isDeleted,
		};

		(prismaServiceMock.shortenedUrl.findUnique as jest.Mock).mockResolvedValue(
			prismaShortenedUrl,
		);
		(prismaServiceMock.shortenedUrl.update as jest.Mock).mockResolvedValue(
			prismaShortenedUrl,
		);

		const result = await repository.findById(shortenedUrl.shortUrl);

		expect(result).toEqual(shortenedUrl);
		expect(prismaServiceMock.shortenedUrl.findUnique).toHaveBeenCalledWith({
			where: { shortUrl: shortenedUrl.shortUrl },
		});
		expect(prismaServiceMock.shortenedUrl.update).toHaveBeenCalledWith({
			where: { shortUrl: shortenedUrl.shortUrl },
			data: { clickCount: shortenedUrl.clickCount + 1 },
		});
		expect(prismaServiceMock.shortenedUrl.findUnique).toHaveBeenCalledTimes(1);
		expect(prismaServiceMock.shortenedUrl.update).toHaveBeenCalledTimes(1);
	});

	it("should update a shortened URL by ID", async () => {
		const updatedShortenedUrl = new ShortenedUrl(
			"https://newexample.com",
			"http://localhost:8080/654321",
			20,
			userId,
			validDateTime,
			validDateTime,
			false,
			shortenedId,
		);

		await repository.findByIdAndUpdate(userId, {
			id: updatedShortenedUrl.id,
			originalUrl: updatedShortenedUrl.originalUrl,
			shortUrl: updatedShortenedUrl.shortUrl.split("/")[3],
			clickCount: updatedShortenedUrl.clickCount,
			createdAt: updatedShortenedUrl.createdAt,
			updatedAt: updatedShortenedUrl.updatedAt,
		});

		expect(prismaServiceMock.shortenedUrl.update).toHaveBeenCalledTimes(1);
	});

	it("should delete a shortened URL by ID", async () => {
		const newId = "2116cd5b-8399-4fd6-afa7-370100cd354c";
		await repository.findByIdAndDelete(userId, newId);

		expect(prismaServiceMock.shortenedUrl.update).toHaveBeenCalledWith({
			where: {
				id_userId: {
					id: newId,
					userId: userId,
				},
			},
			data: {
				originalUrl: null,
				shortUrl: null,
				clickCount: null,
				createdAt: null,
				updatedAt: expect.any(Date),
				isDeleted: true,
			},
		});
		expect(prismaServiceMock.shortenedUrl.update).toHaveBeenCalledTimes(1);
	});

	it("should find all shortened URLs", async () => {
		const prismaShortenedUrls = [
			{
				id: shortenedId,
				originalUrl: shortenedUrl.originalUrl,
				shortUrl: shortenedUrl.shortUrl.split("/")[3],
				clickCount: shortenedUrl.clickCount,
				userId: shortenedUrl.userId,
				createdAt: new Date(validDateTime),
				updatedAt: new Date(validDateTime),
				isDeleted: shortenedUrl.isDeleted,
			},
		];

		(prismaServiceMock.shortenedUrl.findMany as jest.Mock).mockResolvedValue(
			prismaShortenedUrls,
		);

		const result = await repository.findAll();

		expect(result).toEqual([shortenedUrl]);
		expect(prismaServiceMock.shortenedUrl.findMany).toHaveBeenCalledTimes(1);
	});
});
