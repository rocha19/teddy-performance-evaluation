import { InvalidDateTimeError } from "@/domain/errors";
import { DateTime, Either } from "@/domain/utils";

describe("DateTime Entity Validation", () => {
	it("Should create a valid DateTime instance with ISO 8601 format", () => {
		const validDateTime = "2024-08-18T12:34:56Z";
		const result: Either<InvalidDateTimeError, DateTime> =
			DateTime.register(validDateTime);

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value).toBeInstanceOf(DateTime);
			expect(result.value.dateTime).toBe(validDateTime);
		}
	});

	it("Should return an InvalidDateTimeError for an invalid ISO 8601 format", () => {
		const invalidDateTime = "2024-08-18 12:34:56";
		const result: Either<InvalidDateTimeError, DateTime> =
			DateTime.register(invalidDateTime);

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value).toBeInstanceOf(InvalidDateTimeError);
			expect(result.value.message).toBe(
				`Invalid date-time: ${invalidDateTime}.`,
			);
		}
	});

	it("Should return an InvalidDateTimeError for an empty dateTime string", () => {
		const emptyDateTime = "";
		const result: Either<InvalidDateTimeError, DateTime> =
			DateTime.register(emptyDateTime);

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value).toBeInstanceOf(InvalidDateTimeError);
			expect(result.value.message).toBe(`Invalid date-time: ${emptyDateTime}.`);
		}
	});

	it("Should return an InvalidDateTimeError for an invalid date format", () => {
		const invalidDateTime = "13-18-2024";
		const result: Either<InvalidDateTimeError, DateTime> =
			DateTime.register(invalidDateTime);

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value).toBeInstanceOf(InvalidDateTimeError);
			expect(result.value.message).toBe(
				`Invalid date-time: ${invalidDateTime}.`,
			);
		}
	});
});
