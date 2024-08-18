import { ShortenedUrl } from "@/domain/entity";

const originalUrl = "https://www.example.com/abc1234567890abc";
const shortUrl = "https://short.io/abc123";
const invalidUrl = "www.example.com";
const createdAt = "2024-08-18T12:34:56Z";
const invalidCreatedAt = "09:55:27";
const updatedAt = "2024-08-18T13:34:56Z";
const invalidUpdatedAt = "09:55:27";
const id = "f7308c30-8cc2-4b8a-976e-73266d69cd23";
const invalidId = "invalid-id";

describe("ShortenedUrl Entity Validation", () => {
	it("Should create a ShortenedUrl instance with valid attributes", () => {
		const sut = new ShortenedUrl(
			originalUrl,
			shortUrl,
			0,
			"user-id",
			createdAt,
			updatedAt,
			false,
			id,
		);
		expect(sut).toBeInstanceOf(ShortenedUrl);
	});

	it("Should throw an error if the originalUrl is invalid", () => {
		expect(() => new ShortenedUrl(invalidUrl, shortUrl)).toThrow(
			"Invalid original URL",
		);
	});

	it("Should throw an error if the shortUrl is invalid", () => {
		expect(() => new ShortenedUrl(originalUrl, invalidUrl)).toThrow(
			"Invalid short URL",
		);
	});

	it("Should throw an error if createdAt is invalid", () => {
		expect(
			() =>
				new ShortenedUrl(originalUrl, shortUrl, 0, "user-id", invalidCreatedAt),
		).toThrow("Invalid createdAt");
	});

	it("Should throw an error if updatedAt is invalid", () => {
		expect(
			() =>
				new ShortenedUrl(
					originalUrl,
					shortUrl,
					0,
					"user-id",
					createdAt,
					invalidUpdatedAt,
				),
		).toThrow("Invalid updatedAt");
	});

	it("Should throw an error if id is invalid", () => {
		expect(
			() =>
				new ShortenedUrl(
					originalUrl,
					shortUrl,
					0,
					"user-id",
					createdAt,
					updatedAt,
					false,
					invalidId,
				),
		).toThrow("Invalid id");
	});
});
