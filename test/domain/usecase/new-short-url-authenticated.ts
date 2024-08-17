import { ShortenedUrl } from "../entity";
import { Repository } from "../repository";

export class NewShortUrlAuthenticatedUseCase {
	constructor(private repository: Repository<ShortenedUrl>) {}

	async execute(userId: string, originalUrl: string): Promise<string> {
		try {
			const domain = process.env.DOMAIN || "";
			const code = this.generateCode();
			const shortUrl = `${domain}/${code}`;
			const newShortUrl = new ShortenedUrl(originalUrl, code, 0, userId);

			await this.repository.create(newShortUrl);

			return shortUrl;
		} catch (error) {
			throw new Error(`Error creating user: ${error.message}`);
		}
	}
	private generateCode() {
		let text = "";
		const possible =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		for (let i = 0; i < 6; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	}
}
