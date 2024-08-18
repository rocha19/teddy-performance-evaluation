import { InvalidUrlError } from "@/domain/errors";
import { Either, Url } from "@/domain/utils";

describe("Url Entity Validation", () => {
	it("Should create a valid Url instance with 'http' scheme", () => {
		const validUrl = "http://example.com";
		const result: Either<InvalidUrlError, Url> = Url.register(validUrl);

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value).toBeInstanceOf(Url);
			expect(result.value.value).toBe(validUrl);
		}
	});

	it("Should create a valid Url instance with 'https' scheme", () => {
		const validUrl = "https://example.com";
		const result: Either<InvalidUrlError, Url> = Url.register(validUrl);

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value).toBeInstanceOf(Url);
			expect(result.value.value).toBe(validUrl);
		}
	});

	it("Should return an InvalidUrlError for a URL without 'http' or 'https'", () => {
		const invalidUrl = "ftp://example.com";
		const result: Either<InvalidUrlError, Url> = Url.register(invalidUrl);

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value).toBeInstanceOf(InvalidUrlError);
			expect(result.value.message).toBe(`Invalid URL: ${invalidUrl}.`);
		}
	});

	it("Should return an InvalidUrlError for a URL shorter than 11 characters", () => {
		const invalidUrl = "http://a.c";
		const result: Either<InvalidUrlError, Url> = Url.register(invalidUrl);

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value).toBeInstanceOf(InvalidUrlError);
			expect(result.value.message).toBe(`Invalid URL: ${invalidUrl}.`);
		}
	});

	it("Should return an InvalidUrlError for an empty URL", () => {
		const emptyUrl = "";
		const result: Either<InvalidUrlError, Url> = Url.register(emptyUrl);

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value).toBeInstanceOf(InvalidUrlError);
			expect(result.value.message).toBe(`Invalid URL: ${emptyUrl}.`);
		}
	});

	it("Should return an InvalidUrlError for a null or undefined URL", () => {
		const nullUrl: string | null = null;
		const undefinedUrl: string | undefined = undefined;

		const nullResult: Either<InvalidUrlError, Url> = Url.register(
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			nullUrl as any,
		);
		const undefinedResult: Either<InvalidUrlError, Url> = Url.register(
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			undefinedUrl as any,
		);

		expect(nullResult.isLeft()).toBeTruthy();
		expect(undefinedResult.isLeft()).toBeTruthy();

		if (nullResult.isLeft()) {
			expect(nullResult.value).toBeInstanceOf(InvalidUrlError);
			expect(nullResult.value.message).toBe(`Invalid URL: ${nullUrl}.`);
		}

		if (undefinedResult.isLeft()) {
			expect(undefinedResult.value).toBeInstanceOf(InvalidUrlError);
			expect(undefinedResult.value.message).toBe(
				`Invalid URL: ${undefinedUrl}.`,
			);
		}
	});
});
