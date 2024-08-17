import { ShortenedUrl } from "../entity";

export class NewShortUrlUnauthenticatedUseCase {
	async execute(url: string): Promise<string> {
		try {
			const domain = "http://localhost:8080";
			const code = this.generateCode();
			const shortenedUrl = `${domain}/${code}`;
			const shortenedUrlEntity = new ShortenedUrl(url, shortenedUrl);
			return shortenedUrl;
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
