import { DateTime, Id, Url } from "../utils";

export class ShortenedUrl {
	constructor(
		public readonly originalUrl: string,
		public readonly shortUrl: string,
		public readonly clickCount?: number,
		public readonly userId?: string | undefined,
		public readonly createdAt?: string | undefined,
		public readonly updatedAt?: string | undefined,
		public readonly isDeleted?: boolean | undefined,
		public readonly id?: string | undefined,
	) {
		if (!Url.register(originalUrl)) {
			throw new Error("Invalid original URL");
		}

		if (!Url.register(shortUrl)) {
			throw new Error("Invalid short URL");
		}

		if (createdAt && !DateTime.register(createdAt)) {
			throw new Error("Invalid createdAt");
		}

		if (updatedAt && !DateTime.register(updatedAt)) {
			throw new Error("Invalid updatedAt");
		}

		if (id && !Id.register(id)) {
			throw new Error("Invalid id");
		}
	}
}

/*
import { InvalidUrlError, InvalidPasswordError } from "@/domain/errors";
import { DateTime, Id, Url } from "@/domain/utils";
import { Either, left, right } from "@/domain/utils";

export class ShortenedUrl {
  constructor(
    public readonly originalUrl: Url,
    public readonly shortUrl: Url,
    public readonly clickCount?: number,
    public readonly userId?: Id,
    public readonly createdAt?: DateTime,
    public readonly updatedAt?: DateTime,
    public readonly isDeleted?: boolean,
    public readonly id?: Id,
  ) {}
  public static register(
    shortenerUrl: ShortenedUrlTypes,
  ): Either<InvalidUrlError | InvalidPasswordError, ShortenedUrl> {
    const originalUrlOrError = Url.register(shortenerUrl.originalUrl);
    if (originalUrlOrError.isLeft()) return left(originalUrlOrError.value);
    const shortUrlOrError = Url.register(shortenerUrl.shortUrl);
    if (shortUrlOrError.isLeft()) return left(shortUrlOrError.value);
    const originalUrl: Url = originalUrlOrError.value as Url;
    const shortUrl: Url = originalUrlOrError.value as Url;
    return right(new ShortenedUrl(originalUrl, shortUrl));
  }
}
type ShortenedUrlTypes = {
  id?: string;
  originalUrl: string;
  shortUrl: string;
  clickCount?: number;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
  isDeleted?: boolean;
};
*/
