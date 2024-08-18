import { InvalidIdError } from "@/domain/errors";
import { Either, Id } from "@/domain/utils";

describe("Id Entity Validation", () => {
	it("Should create a valid Id instance", () => {
		const validId = "123e4567-e89b-12d3-a456-426614174000"; // Exemplo de UUID válido
		const result: Either<InvalidIdError, Id> = Id.register(validId);

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value).toBeInstanceOf(Id);
			expect(result.value.value).toBe(validId);
		}
	});

	it("Should return an InvalidIdError when the id is invalid", () => {
		const invalidId = "invalid-id";
		const result: Either<InvalidIdError, Id> = Id.register(invalidId);

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value).toBeInstanceOf(InvalidIdError);
			expect(result.value.message).toBe(`Invalid id: ${invalidId}.`);
		}
	});

	it("Should return an InvalidIdError when the id is empty", () => {
		const emptyId = "";
		const result: Either<InvalidIdError, Id> = Id.register(emptyId);

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value).toBeInstanceOf(InvalidIdError);
			expect(result.value.message).toBe(`Invalid id: ${emptyId}.`);
		}
	});

	it("Should return an InvalidIdError when the id is null or undefined", () => {
		const nullId: string | null = null;
		const undefinedId: string | undefined = undefined;

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const nullResult: Either<InvalidIdError, Id> = Id.register(nullId as any);
		const undefinedResult: Either<InvalidIdError, Id> = Id.register(
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			undefinedId as any,
		);

		expect(nullResult.isLeft()).toBeTruthy();
		expect(undefinedResult.isLeft()).toBeTruthy();

		if (nullResult.isLeft()) {
			expect(nullResult.value).toBeInstanceOf(InvalidIdError);
			expect(nullResult.value.message).toBe(`Invalid id: ${nullId}.`);
		}

		if (undefinedResult.isLeft()) {
			expect(undefinedResult.value).toBeInstanceOf(InvalidIdError);
			expect(undefinedResult.value.message).toBe(`Invalid id: ${undefinedId}.`);
		}
	});

	it("Should return an InvalidIdError when the id format is incorrect", () => {
		const incorrectFormatId = "12345";
		const result: Either<InvalidIdError, Id> = Id.register(incorrectFormatId);

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value).toBeInstanceOf(InvalidIdError);
			expect(result.value.message).toBe(`Invalid id: ${incorrectFormatId}.`);
		}
	});
});
