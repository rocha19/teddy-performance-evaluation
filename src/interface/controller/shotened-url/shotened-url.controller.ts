import { AccessShotenedUrlService, NewShotenedUrlService } from "@/application";
import { FullUrlDto } from "@/interface/dto/full-url";
import { Body, Controller, Get, Headers, Param, Post } from "@nestjs/common";

@Controller()
export class ShotenedUrlController {
	constructor(
		private readonly newShotenedUrlService: NewShotenedUrlService,
		private readonly accessShotenedUrlService: AccessShotenedUrlService,
	) {}

	@Post("api/shortened-link")
	async generateShortUrl(
		@Headers("authorization") authHeader: string,
		@Body() data: FullUrlDto,
	) {
		return await this.newShotenedUrlService.execute(authHeader, data);
	}

	@Get(":code")
	async acessShortUrl(
		@Headers("authorization") authHeader: string,
		@Param() params: { code: string },
	) {
		return await this.accessShotenedUrlService.execute(authHeader, params.code);
	}
}
