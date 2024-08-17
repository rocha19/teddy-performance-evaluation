export class InvalidDateTimeError extends Error {
	public readonly name = "InvalidDateTimeError";
	constructor(dateTime: string) {
		super(`Invalid date-time: ${dateTime}.`);
		this.name = "InvalidDateTimeError";
	}
}
