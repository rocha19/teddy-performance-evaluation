import { IsString, IsUUID, Length } from "class-validator";

export class ParamDTO {
	@IsUUID()
	@IsString()
	readonly id: string;

	@IsUUID()
	@IsString()
	readonly urlId: string;

	@Length(6)
	@IsString()
	readonly code: string;
}
