import { DeleteShortUrlByIdUseCase } from "@/domain";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DeleteShortUrlService {
	constructor(private deleteShortUrlById: DeleteShortUrlByIdUseCase) {}
	async execute(userId: string, shortUrlId: string): Promise<void> {
		await this.deleteShortUrlById.execute(userId, shortUrlId);
	}
}
