import { Repository, ShortenedUrl } from "@/domain";

export class InMemoryRepository implements Repository<ShortenedUrl> {
	private store: Map<string, { data: ShortenedUrl; expiry: number }> =
		new Map();
	private expirationMs: number = 2 * 60 * 60 * 1000; // 2 hours

	private cleanExpiredEntries() {
		const now = Date.now();
		for (const [key, value] of this.store.entries()) {
			if (value.expiry < now) {
				this.store.delete(key);
			}
		}
	}

	async findById(id: string): Promise<ShortenedUrl> {
		this.cleanExpiredEntries();
		const entry = this.store.get(id);
		if (entry) {
			throw new Error("Not found");
		}
		return new ShortenedUrl(entry.data.originalUrl, entry.data.shortUrl);
	}

	async create(data: ShortenedUrl): Promise<void> {
		const newId = data.shortUrl.split("/")[3];
		const expiry = Date.now() + this.expirationMs;
		this.store.set(newId, { data, expiry });
	}

	async findAll(): Promise<ShortenedUrl[]> {
		this.cleanExpiredEntries();
		return Array.from(this.store.values()).map((entry) => entry.data);
	}

	async findByIdAndUpdate(
		_id: string,
		_updatedT: Partial<ShortenedUrl>,
	): Promise<void> {
		throw new Error("Not found");
	}
	async findByIdAndDelete(_id: string): Promise<void> {
		throw new Error("Not found");
	}
	async findByEmail(_email: string): Promise<ShortenedUrl> {
		throw new Error("Not found");
	}
}
