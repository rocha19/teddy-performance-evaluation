import { ShortenedUrl } from "../entity";
import { Repository } from "../repository";

export class UpdateShortUrlByIdUseCase {
	constructor(private repository: Repository<ShortenedUrl>) {}

	async execute(userId: string, shortUrl: ShortenedUrl): Promise<void> {
		try {
			await this.repository.findByIdAndUpdate(userId, shortUrl);
		} catch (error) {
			throw new Error(`Error creating shortUrl: ${error.message}`);
		}
	}
}
