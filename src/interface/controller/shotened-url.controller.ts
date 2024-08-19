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
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";

@ApiTags("Shortener URL")
@Controller()
export class ShotenedUrlController {
	constructor(
		private readonly newShotenedUrlService: NewShotenedUrlService,
		private readonly accessShotenedUrlService: AccessShotenedUrlService,
		private readonly updateShortUrlService: UpdateShortUrlService,
		private readonly deleteShortUrlService: DeleteShortUrlService,
	) {}

	@Post("api/shortener")
	@ApiResponse({
		status: 200,
		description: "Return a shortener url from the API.",
	})
	async generateShortUrl(
		@Headers("authorization") authHeader: string,
		@Body() data: FullUrlDto,
	) {
		return await this.newShotenedUrlService.execute(authHeader, data);
	}

	@Get("api/:code")
	@Post("api/shortener")
	@ApiResponse({
		status: 200,
		description: "See original URL returned from API.",
	})
	async acessShortUrl(
		@Headers("authorization") authHeader: string,
		@Param() params: ParamDTO,
	) {
		return await this.accessShotenedUrlService.execute(authHeader, params.code);
	}

	@Get(":code")
	@ApiResponse({
		status: 302,
		description: "Redirect to original URL returned from API.",
	})
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
	@ApiResponse({
		status: 302,
		description: "Update Original URL with an Authenticated User",
	})
	async update(
		@Param() param: ParamDTO,
		@Body() shortUrl: UpdateShortenedUrlDto,
	) {
		return await this.updateShortUrlService.execute(param.id, shortUrl);
	}

	@HttpCode(204)
	@UseGuards(JwtGuard)
	@Delete("api/shortener/:id/:urlId")
	@ApiResponse({
		status: 302,
		description: "Delete shortener URL with an Authenticated User",
	})
	async delete(@Param() param: ParamDTO) {
		return await this.deleteShortUrlService.execute(param.id, param.urlId);
	}
}
