import {
	AccessShotenedUrlService,
	DeleteShortUrlService,
	JwtGuard,
	NewShotenedUrlService,
	UpdateShortUrlService,
} from "@/application";
import { UpdateShortenedUrlDto } from "@/interface/dto";
import { FullUrlDto } from "@/interface/dto/full-url";
import { ParamDTO } from "@/interface/dto/params";
import {
	Body,
	Controller,
	Delete,
	Get,
	Headers,
	HttpCode,
	Param,
	Patch,
	Post,
	Res,
	UseGuards,
} from "@nestjs/common";
import { Response } from "express";

@Controller()
export class ShotenedUrlController {
	constructor(
		private readonly newShotenedUrlService: NewShotenedUrlService,
		private readonly accessShotenedUrlService: AccessShotenedUrlService,
		private readonly updateShortUrlService: UpdateShortUrlService,
		private readonly deleteShortUrlService: DeleteShortUrlService,
	) {}

	@Post("api/shortener")
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

	@HttpCode(204)
	@UseGuards(JwtGuard)
	@Patch("api/shortener/:id")
	async update(
		@Param() param: ParamDTO,
		@Body() shortUrl: UpdateShortenedUrlDto,
	) {
		return await this.updateShortUrlService.execute(param.id, shortUrl);
	}

	@HttpCode(204)
	@UseGuards(JwtGuard)
	@Delete("api/shortener/:id/:urlId")
	async delete(@Param() param: ParamDTO) {
		return await this.deleteShortUrlService.execute(param.id, param.urlId);
	}
}
