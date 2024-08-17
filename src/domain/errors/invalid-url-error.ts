export class InvalidUrlError extends Error {
	public readonly name = "InvalidUrlError";
	constructor(url: string) {
		super(`Invalid URL: ${url}.`);
		this.name = "InvalidUrlError";
	}
}
