import {
	IsArray,
	IsDateString,
	IsEmail,
	IsOptional,
	IsString,
	IsUUID,
	MaxLength,
	MinLength,
} from "class-validator";
import { ShortenedUrlDto } from "./shortened-url.dto";

export class CreateUserDto {
	@IsEmail()
	readonly email: string;

	@MinLength(6)
	@MaxLength(20)
	@IsString()
	readonly password: string;

	@IsOptional()
	@IsArray()
	readonly shortenedUrl?: ShortenedUrlDto[];

	@IsDateString()
	readonly createdAt: string;

	@IsDateString()
	readonly updatedAt: string;
}

export class UpdateUserDto {
	@IsOptional()
	@IsEmail()
	readonly email?: string;

	@MinLength(6)
	@MaxLength(20)
	@IsOptional()
	@IsString()
	readonly password?: string;
}

export class UserDto {
	@IsUUID()
	@IsString()
	readonly id: string;

	@IsEmail()
	readonly email: string;

	@IsOptional()
	@IsArray()
	readonly shortenedUrl?: ShortenedUrlDto[];

	@IsDateString()
	readonly createdAt: string;

	@IsDateString()
	readonly updatedAt: string;

	@IsOptional()
	@IsDateString()
	readonly deletedAt?: string;
}
