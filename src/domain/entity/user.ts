import { ShortenedUrl } from "./shortened-url";

export class User {
	constructor(
		public readonly email: string,
		private _password: string,
		public readonly shortenedUrl: ShortenedUrl[] = [],
		public readonly createdAt?: string,
		public readonly updatedAt?: string,
		public readonly id?: string,
	) {}

	get password(): string {
		return this._password;
	}

	set password(newPassword: string) {
		this._password = newPassword;
	}
}
