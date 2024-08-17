export class InvalidIdError extends Error {
	public readonly id = "InvalidIdError";
	constructor(id: string) {
		super(`Invalid id: ${id}.`);
	}
}
