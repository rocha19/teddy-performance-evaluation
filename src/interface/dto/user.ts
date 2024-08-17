import {
	IsArray,
	IsDateString,
	IsEmail,
	IsOptional,
	IsString,
	Max,
	Min,
} from "class-validator";
import { ShortenedUrlDto } from "./shortened-url.dto";

export class CreateUserDto {
	@IsEmail()
	readonly email: string;

	@Min(6)
	@Max(20)
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

	@Min(6)
	@Max(20)
	@IsOptional()
	@IsString()
	readonly password?: string;

	@IsOptional()
	@IsArray()
	readonly shortenedUrl?: ShortenedUrlDto[];
}

export class UserDto {
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
