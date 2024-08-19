import { ApiProperty } from "@nestjs/swagger";
import {
	IsBoolean,
	IsDate,
	IsNumber,
	IsOptional,
	IsString,
	IsUUID,
} from "class-validator";

export class CreateShortenedUrlDto {
	@ApiProperty({
		description: "The original URL that needs to be shortened",
		example: "https://www.example.com",
	})
	@IsString()
	readonly originalUrl: string;

	@ApiProperty({
		description: "The shortened version of the original URL",
		example: "https://short.url/abc123",
	})
	@IsString()
	readonly shortUrl: string;

	@IsOptional()
	@IsNumber()
	readonly clickCount: number;

	@IsOptional()
	@IsString()
	readonly userId?: string;

	@IsOptional()
	@IsDate()
	readonly createdAt: string;

	@IsOptional()
	@IsDate()
	readonly updatedAt: string;

	@IsOptional()
	@IsDate()
	readonly deletedAt?: string;
}

export class UpdateShortenedUrlDto {
	@ApiProperty({
		description: "Unique identifier of the shortened URL",
		example: "c56a4180-65aa-42ec-a945-5fd21dec0538",
	})
	@IsUUID()
	@IsString()
	readonly id: string;

	@ApiProperty({
		description: "The original URL that needs to be shortened",
		example: "https://www.example.com",
		required: false,
	})
	@IsOptional()
	@IsString()
	readonly originalUrl?: string;

	@ApiProperty({
		description: "The shortened version of the original URL",
		example: "https://short.url/abc123",
		required: false,
	})
	@IsOptional()
	@IsString()
	readonly shortUrl?: string;

	@IsOptional()
	@IsNumber()
	readonly clickCount?: number;

	@IsOptional()
	@IsBoolean()
	readonly isDeleted?: boolean;

	@ApiProperty({
		description: "The ID of the user who created the shortened URL",
		example: "c56a4180-65aa-42ec-a945-5fd21dec0538",
		required: false,
	})
	@IsOptional()
	@IsString()
	readonly userId?: string;

	@IsOptional()
	@IsDate()
	readonly createdAt?: string;

	@IsOptional()
	@IsDate()
	readonly updatedAt?: string;
}

export class ShortenedUrlDto {
	@ApiProperty({
		description: "Unique identifier of the shortened URL",
		example: "c56a4180-65aa-42ec-a945-5fd21dec0538",
	})
	@IsUUID()
	@IsString()
	readonly id: string;

	@ApiProperty({
		description: "The original URL that needs to be shortened",
		example: "https://www.example.com",
	})
	@IsString()
	readonly originalUrl: string;

	@ApiProperty({
		description: "The shortened version of the original URL",
		example: "https://short.url/abc123",
	})
	@IsString()
	readonly shortUrl: string;

	@ApiProperty({
		description: "The number of times the shortened URL has been clicked",
		example: 42,
	})
	@IsNumber()
	readonly clickCount: number;

	@ApiProperty({
		description: "The date and time when the shortened URL was created",
		example: "2023-08-19T12:34:56Z",
	})
	@IsDate()
	readonly createdAt: string;

	@ApiProperty({
		description: "The date and time when the shortened URL was last updated",
		example: "2023-08-19T12:34:56Z",
	})
	@IsDate()
	readonly updatedAt: string;

	@ApiProperty({
		description: "The ID of the user who created the shortened URL",
		example: "c56a4180-65aa-42ec-a945-5fd21dec0538",
		required: false,
	})
	@IsOptional()
	@IsString()
	readonly userId?: string;

	@ApiProperty({
		description:
			"If true, the other fields will be null and the date the user was deleted is marked in the last update",
		example: false,
		required: false,
	})
	@IsOptional()
	@IsBoolean()
	readonly isDeleted?: boolean;
}
