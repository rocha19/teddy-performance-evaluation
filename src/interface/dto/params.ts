import { IsString, IsUUID, Length, MinLength } from "class-validator";

export class ParamDTO {
	@IsUUID()
	@IsString()
	readonly id: string;

	@Length(6)
	@IsString()
	readonly code: string;
}
