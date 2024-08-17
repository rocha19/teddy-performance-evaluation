import { InvalidPasswordError } from "@/domain/errors";
import { Either, left, right } from "@/domain/utils";
export class Password {
	public readonly value: string;
	private constructor(password: string) {
		this.value = password;
	}
	public static register(
		password: string,
	): Either<InvalidPasswordError, Password> {
		if (!Password.validator(password)) {
			return left(new InvalidPasswordError(password));
		}
		return right(new Password(password));
	}
	public static validator(password: string): boolean {
		if (!password) {
			return false;
		}
		if (password.trim().length < 6 || password.trim().length > 20) {
			return false;
		}
		return true;
	}
}
