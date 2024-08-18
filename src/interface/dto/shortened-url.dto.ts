import {
	IsBoolean,
	IsDate,
	IsNumber,
	IsOptional,
	IsString,
	IsUUID,
} from "class-validator";

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
	@IsUUID()
	@IsString()
	readonly id: string;

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
	@IsBoolean()
	readonly isDeleted?: boolean;

	@IsOptional()
	@IsString()
	readonly userId?: string;

	@IsOptional()
	@IsDate()
	readonly createdAt: string;

	@IsOptional()
	@IsDate()
	readonly updatedAt: string;
}

export class ShortenedUrlDto {
	@IsUUID()
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
	@IsBoolean()
	readonly isDeleted?: boolean;
}
