import { ShortenedUrl } from "../entity";
import { Repository } from "../repository";

export class NewShortUrlAuthenticatedUseCase {
	constructor(private repository: Repository<ShortenedUrl>) {}

	async execute(userId: string, originalUrl: string): Promise<string> {
		const domain = process.env.DOMAIN || "";
		const code = this.generateCode();
		const shortUrl = `${domain}/${code}`;
		const newShortUrl = new ShortenedUrl(originalUrl, shortUrl, 0, userId);

		await this.repository.create(newShortUrl);

		return shortUrl;
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
