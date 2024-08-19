import { ShortenedUrl } from "../entity";
import { Repository } from "../repository";

export class NewShortUrlUnauthenticatedUseCase {
	constructor(private repository: Repository<ShortenedUrl>) {}

	async execute(url: string): Promise<string> {
		const domain = process.env.DOMAIN || "";
		const code = this.generateCode();
		const shortenedUrl = `${domain}/${code}`;
		const shortenedUrlEntity = new ShortenedUrl(url, shortenedUrl);
		await this.repository.create(shortenedUrlEntity);
		return shortenedUrl;
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
