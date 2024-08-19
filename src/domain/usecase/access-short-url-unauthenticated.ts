import { ShortenedUrl } from "../entity";
import { Repository } from "../repository";

export class AccessShortUrlUnauthenticatedUseCase {
	constructor(private repository: Repository<ShortenedUrl>) {}

	async execute(code: string): Promise<string> {
		const { originalUrl } = await this.repository.findById(code);
		return originalUrl;
	}
}
