import { InvalidDateTimeError } from "@/domain/errors";
import { Either, left, right } from "@/domain/utils";
export class DateTime {
	public readonly dateTime: string;
	private constructor(dateTime: string) {
		this.dateTime = dateTime;
	}
	public static register(
		dateTime: string,
	): Either<InvalidDateTimeError, DateTime> {
		if (!DateTime.validator(dateTime)) {
			return left(new InvalidDateTimeError(dateTime));
		}
		return right(new DateTime(dateTime));
	}
	static validator(dateTime: string | number): boolean | Error {
		const regexTestStringInput =
			/^(0?[1-9]|1[012])(-|.| )(1[0-2]|0[1-9])(|-|.| )([0-9]{4})$/;
		const regexDateTime =
			/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/gm;
		const dateValid = regexTestStringInput.test(dateTime.toString())
			? new Date(`${dateTime} UTC`).toISOString()
			: false;
		// const testStringInput = !Number.isNaN(new Date(dateTime).toISOString())
		//   ? 'true'
		//   : false
		// if (testStringInput) return false
		const validDateTime =
			regexDateTime.test(dateValid.toString()) ||
			regexDateTime.test(dateTime.toString());
		if (!validDateTime) return false;
		return true;
	}
}
