import { InvalidUrlError } from "@/domain/errors";
import { Either, left, right } from "@/domain/utils";
export class Url {
	public readonly value: string;
	private constructor(url: string) {
		this.value = url;
	}
	public static register(url: string): Either<InvalidUrlError, Url> {
		if (!Url.validator(url)) {
			return left(new InvalidUrlError(url));
		}
		return right(new Url(url));
	}
	public static validator(url: string): boolean {
		if (!url) {
			return false;
		}
		if (url.trim().length < 11) {
			// http://a.com
			return false;
		}
		return true;
	}
}
