import { InvalidPasswordError } from "@/domain/errors";
import { Either, Password } from "@/domain/utils";

describe("Password Entity Validation", () => {
	it("Should create a valid Password instance", () => {
		const validPassword = "validPass123";
		const result: Either<InvalidPasswordError, Password> =
			Password.register(validPassword);

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value).toBeInstanceOf(Password);
			expect(result.value.value).toBe(validPassword);
		}
	});

	it("Should return an InvalidPasswordError when the password is too short", () => {
		const shortPassword = "123";
		const result: Either<InvalidPasswordError, Password> =
			Password.register(shortPassword);

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value).toBeInstanceOf(InvalidPasswordError);
			expect(result.value.message).toBe(`Invalid password: ${shortPassword}.`);
		}
	});

	it("Should return an InvalidPasswordError when the password is too long", () => {
		const longPassword = "thisIsAVeryLongPassword12345";
		const result: Either<InvalidPasswordError, Password> =
			Password.register(longPassword);

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value).toBeInstanceOf(InvalidPasswordError);
			expect(result.value.message).toBe(`Invalid password: ${longPassword}.`);
		}
	});

	it("Should return an InvalidPasswordError when the password is empty", () => {
		const emptyPassword = "";
		const result: Either<InvalidPasswordError, Password> =
			Password.register(emptyPassword);

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value).toBeInstanceOf(InvalidPasswordError);
			expect(result.value.message).toBe(`Invalid password: ${emptyPassword}.`);
		}
	});

	it("Should return an InvalidPasswordError when the password is null or undefined", () => {
		const nullPassword: string | null = null;
		const undefinedPassword: string | undefined = undefined;

		const nullResult: Either<InvalidPasswordError, Password> =
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			Password.register(nullPassword as any);
		const undefinedResult: Either<InvalidPasswordError, Password> =
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			Password.register(undefinedPassword as any);

		expect(nullResult.isLeft()).toBeTruthy();
		expect(undefinedResult.isLeft()).toBeTruthy();

		if (nullResult.isLeft()) {
			expect(nullResult.value).toBeInstanceOf(InvalidPasswordError);
			expect(nullResult.value.message).toBe(
				`Invalid password: ${nullPassword}.`,
			);
		}

		if (undefinedResult.isLeft()) {
			expect(undefinedResult.value).toBeInstanceOf(InvalidPasswordError);
			expect(undefinedResult.value.message).toBe(
				`Invalid password: ${undefinedPassword}.`,
			);
		}
	});
});
