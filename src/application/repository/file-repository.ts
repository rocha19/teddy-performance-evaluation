import { promises as fs } from "node:fs";
import { resolve } from "node:path";
import { Repository, ShortenedUrl } from "@/domain";

export class FileRepository implements Repository<ShortenedUrl> {
	private readonly filePath = resolve(__dirname, "shortenedUrls.json");
	private expirationMs: number = 2 * 60 * 60 * 1000; // 2 hours

	private async readStore(): Promise<
		Map<string, { data: ShortenedUrl; expiry: number }>
	> {
		try {
			const fileContent = await fs.readFile(this.filePath, "utf-8");
			const jsonData = JSON.parse(fileContent);
			return new Map(Object.entries(jsonData));
		} catch (err) {
			if (err.code === "ENOENT") {
				return new Map();
			}
			throw err;
		}
	}

	private async writeStore(
		store: Map<string, { data: ShortenedUrl; expiry: number }>,
	) {
		const jsonData = Object.fromEntries(store);
		await fs.writeFile(this.filePath, JSON.stringify(jsonData, null, 2));
	}

	private async cleanExpiredEntries(
		store: Map<string, { data: ShortenedUrl; expiry: number }>,
	) {
		const now = Date.now();
		for (const [key, value] of store.entries()) {
			if (value.expiry < now) {
				store.delete(key);
			}
		}
		await this.writeStore(store);
	}

	async findById(id: string): Promise<ShortenedUrl> {
		const store = await this.readStore();
		await this.cleanExpiredEntries(store);
		const entry = store.get(id);
		if (!entry) {
			throw new Error(`Not found for ID: ${id}`);
		}
		return new ShortenedUrl(entry.data.originalUrl, entry.data.shortUrl);
	}

	async create(data: ShortenedUrl): Promise<void> {
		const store = await this.readStore();
		const newId = data.shortUrl.split("/")[3];
		const expiry = Date.now() + this.expirationMs;
		store.set(newId, { data, expiry });
		await this.writeStore(store);
	}

	async findAll(): Promise<ShortenedUrl[]> {
		const store = await this.readStore();
		await this.cleanExpiredEntries(store);
		return Array.from(store.values()).map((entry) => entry.data);
	}

	async findByIdAndUpdate(
		_id: string,
		_updatedT: Partial<ShortenedUrl>,
	): Promise<void> {
		throw new Error("Not implemented");
	}

	async findByIdAndDelete(_id: string): Promise<void> {
		throw new Error("Not implemented");
	}

	async findByEmail(_email: string): Promise<ShortenedUrl> {
		throw new Error("Not implemented");
	}
}
