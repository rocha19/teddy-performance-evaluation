import { ShortenedUrl } from "../entity";
import { Repository } from "../repository";

export class AccessShortUrlAuthenticatedUseCase {
	constructor(private repository: Repository<ShortenedUrl>) {}

	async execute(code: string) {
		try {
			const { originalUrl } = await this.repository.findById(code);
			return originalUrl;
		} catch (error) {
			throw new Error(`Error creating user: ${error.message}`);
		}
	}
}
