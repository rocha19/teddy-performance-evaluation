import { ShortenedUrl } from "../entity";
import { Repository } from "../repository";

export class DeleteShortUrlByIdUseCase {
	constructor(private repository: Repository<ShortenedUrl>) {}

	async execute(userId: string, shortUrlId: string): Promise<void> {
		await this.repository.findByIdAndDelete(userId, shortUrlId);
	}
}
