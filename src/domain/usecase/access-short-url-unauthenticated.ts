import { ShortenedUrl } from "../entity";

export class AccessShortUrlUnauthenticatedUseCase {
	async execute(url: string): Promise<string> {
		const domain = "http://localhost:8080";
		const code = this.generateCode();
		const shortenedUrl = `${domain}/${code}`;
		// const shortenedUrlEntity = new ShortenedUrl(url, shortenedUrl);
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
