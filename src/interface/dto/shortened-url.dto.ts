import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateShortenedUrlDto {
	@IsString()
	readonly originalUrl: string;

	@IsString()
	readonly shortUrl: string;

	@IsNumber()
	readonly clickCount: number;

	@IsOptional()
	@IsString()
	readonly userId?: string;

	@IsDate()
	readonly createdAt: string;

	@IsDate()
	readonly updatedAt: string;

	@IsOptional()
	@IsDate()
	readonly deletedAt?: string;
}

export class UpdateShortenedUrlDto {
	@IsOptional()
	@IsString()
	readonly originalUrl?: string;

	@IsOptional()
	@IsString()
	readonly shortUrl?: string;

	@IsOptional()
	@IsNumber()
	readonly clickCount?: number;

	@IsOptional()
	@IsString()
	readonly userId?: string;

	@IsOptional()
	@IsDate()
	readonly deletedAt?: string;
}

export class ShortenedUrlDto {
	@IsString()
	readonly id: string;

	@IsString()
	readonly originalUrl: string;

	@IsString()
	readonly shortUrl: string;

	@IsNumber()
	readonly clickCount: number;

	@IsDate()
	readonly createdAt: string;

	@IsDate()
	readonly updatedAt: string;

	@IsOptional()
	@IsString()
	readonly userId?: string;

	@IsOptional()
	@IsDate()
	readonly deletedAt?: string;
}
