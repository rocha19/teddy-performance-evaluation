import { InvalidEmailError } from "@/domain/errors";
import { Either, left, right } from "@/domain/utils";
export class Email {
	public readonly value: string;
	private constructor(email: string) {
		this.value = email;
	}
	public static register(email: string): Either<InvalidEmailError, Email> {
		if (!Email.validator(email)) {
			return left(new InvalidEmailError(email));
		}
		return right(new Email(email));
	}
	public static validator(email: string): boolean {
		if (!email) {
			return false;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}
}
