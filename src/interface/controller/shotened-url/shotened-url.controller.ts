import { AccessShotenedUrlService, NewShotenedUrlService } from "@/application";
import { FullUrlDto } from "@/interface/dto/full-url";
import { ParamDTO } from "@/interface/dto/params";
import {
	Body,
	Controller,
	Get,
	Headers,
	Param,
	Post,
	Res,
} from "@nestjs/common";
import { Response } from "express";

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

	@Get("api/:code")
	async acessShortUrl(
		@Headers("authorization") authHeader: string,
		@Param() params: ParamDTO,
	) {
		return await this.accessShotenedUrlService.execute(authHeader, params.code);
	}

	@Get(":code")
	async accessShortUrl(
		@Headers("authorization") authHeader: string,
		@Param() params: ParamDTO,
		@Res() res: Response,
	) {
		const url = await this.accessShotenedUrlService.execute(
			authHeader,
			params.code,
		);
		return res.redirect(url);
	}
}
