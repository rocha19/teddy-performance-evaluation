import { DateTime, Email, Id, Password } from "../utils";
import { ShortenedUrl } from "./shortened-url";

export class User {
	constructor(
		public readonly email: string,
		private _password: string,
		public readonly shortenedUrl: ShortenedUrl[] = [],
		public readonly createdAt?: string | undefined,
		public readonly updatedAt?: string | undefined,
		public readonly id?: string | undefined,
	) {
		if (!Email.validator(email)) {
			throw new Error("Invalid email");
		}

		if (createdAt && !DateTime.validator(createdAt)) {
			throw new Error("Invalid createdAt");
		}

		if (updatedAt && !DateTime.validator(updatedAt)) {
			throw new Error("Invalid updatedAt");
		}

		if (id && !Id.validator(id)) {
			throw new Error("Invalid id");
		}
	}

	get password(): string {
		return this._password;
	}

	set password(newPassword: string) {
		if (!Password.validator(newPassword)) {
			throw new Error("Invalid password");
		}
		this._password = newPassword;
	}
}

/*
import { InvalidEmailError, InvalidPasswordError } from "@/domain/errors";
import { DateTime, Email, Id, Password } from "@/domain/utils";
import { Either, left, right } from "@/domain/utils";
import { ShortenedUrl } from "./shortened-url";

export class User {
  constructor(
    public readonly email: Email,
    private _password: Password,
    public readonly shortenedUrl?: ShortenedUrl[],
    public readonly createdAt?: DateTime,
    public readonly updatedAt?: string,
    public readonly id?: Id,
  ) {}

  get password(): Password {
    return this._password;
  }

  set password(newPassword: Password) {
    this._password = newPassword;
  }

  public static register(
    userData: UserTypes,
  ): Either<InvalidEmailError | InvalidPasswordError, User> {
    const emailOrError = Email.register(userData.email);
    if (emailOrError.isLeft()) return left(emailOrError.value);
    const passwordOrError = Password.register(userData.password);
    if (passwordOrError.isLeft()) return left(passwordOrError.value);
    const email: Email = emailOrError.value as Email;
    const password: Password = passwordOrError.value as Password;
    return right(new User(email, password));
  }
}

type UserTypes = {
  id?: string;
  email: string;
  password: string;
  shortenedUrl?: ShortenedUrl[];
  createdAt?: string;
  updatedAt?: string;
};
*/
