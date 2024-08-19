import { ApiProperty } from "@nestjs/swagger";
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
	@ApiProperty({
		description: "User's email address",
		example: "john.doe@gmail.com",
	})
	@IsEmail()
	readonly email: string;

	@ApiProperty({
		description: "Password needs to have between 6 and 20 characters",
		example: "123456",
	})
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
	@ApiProperty({
		description: "User's email address",
		example: "john.doe@gmail.com",
		required: false,
	})
	@IsOptional()
	@IsEmail()
	readonly email?: string;

	@ApiProperty({
		description: "Password needs to have between 6 and 20 characters",
		example: "123456",
		required: false,
	})
	@MinLength(6)
	@MaxLength(20)
	@IsOptional()
	@IsString()
	readonly password?: string;
}

export class UserDto {
	@ApiProperty({
		description: "Unique identifier of the user",
		example: "c56a4180-65aa-42ec-a945-5fd21dec0538",
	})
	@IsUUID()
	@IsString()
	readonly id: string;

	@ApiProperty({
		description: "User's email address",
		example: "john.doe@gmail.com",
	})
	@IsEmail()
	readonly email: string;

	@ApiProperty({
		description: "List of shortened URLs associated with the user",
		example: [{ url: "http://short.url/abc123" }],
		required: false,
	})
	@IsOptional()
	@IsArray()
	readonly shortenedUrl?: ShortenedUrlDto[];

	@ApiProperty({
		description: "Date when the user was created",
		example: "2023-08-19T12:34:56Z",
	})
	@IsDateString()
	readonly createdAt: string;

	@ApiProperty({
		description: "Date when the user was last updated",
		example: "2023-08-19T12:34:56Z",
	})
	@IsDateString()
	readonly updatedAt: string;

	@ApiProperty({
		description:
			"If true, the other fields will be null and the date the user was deleted is marked in the last update",
		example: "true",
		required: false,
	})
	@IsOptional()
	@IsDateString()
	readonly deletedAt?: string;
}
