import { InvalidEmailError } from "@/domain/errors";
import { Either, Email } from "@/domain/utils";

describe("Email Entity Validation", () => {
	it("Should create a valid Email instance", () => {
		const email = "valid@email.com";
		const result: Either<InvalidEmailError, Email> = Email.register(email);

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value).toBeInstanceOf(Email);
			expect(result.value.value).toBe(email);
		}
	});

	it("Should return an InvalidEmailError when the email is invalid", () => {
		const invalidEmail = "invalid-email";
		const result: Either<InvalidEmailError, Email> =
			Email.register(invalidEmail);

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value).toBeInstanceOf(InvalidEmailError);
			expect(result.value.message).toBe(`Invalid email: ${invalidEmail}.`);
		}
	});

	it("Should return an InvalidEmailError when the email is empty", () => {
		const emptyEmail = "";
		const result: Either<InvalidEmailError, Email> = Email.register(emptyEmail);

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value).toBeInstanceOf(InvalidEmailError);
			expect(result.value.message).toBe(`Invalid email: ${emptyEmail}.`);
		}
	});

	it("Should return an InvalidEmailError when the email is null or undefined", () => {
		const nullEmail: string | null = null;
		const undefinedEmail: string | undefined = undefined;

		const nullResult: Either<InvalidEmailError, Email> = Email.register(
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			nullEmail as any,
		);
		const undefinedResult: Either<InvalidEmailError, Email> = Email.register(
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			undefinedEmail as any,
		);

		expect(nullResult.isLeft()).toBeTruthy();
		expect(undefinedResult.isLeft()).toBeTruthy();

		if (nullResult.isLeft()) {
			expect(nullResult.value).toBeInstanceOf(InvalidEmailError);
			expect(nullResult.value.message).toBe(`Invalid email: ${nullEmail}.`);
		}

		if (undefinedResult.isLeft()) {
			expect(undefinedResult.value).toBeInstanceOf(InvalidEmailError);
			expect(undefinedResult.value.message).toBe(
				`Invalid email: ${undefinedEmail}.`,
			);
		}
	});
});
