import { IsString, IsUrl } from "class-validator";

export class FullUrlDto {
	@IsUrl()
	@IsString()
	url: string;
}
