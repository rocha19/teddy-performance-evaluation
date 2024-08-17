export class ShortenedUrl {
	constructor(
		public readonly originalUrl: string,
		public readonly shortUrl: string,
		public readonly clickCount?: number,
		public readonly userId?: string,
		public readonly createdAt?: string,
		public readonly updatedAt?: string,
		public readonly isDeleted?: boolean,
		public readonly id?: string,
	) {}
}
