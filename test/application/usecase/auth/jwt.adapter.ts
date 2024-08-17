import { IjwtService } from "@/domain";
import { JwtService } from "@nestjs/jwt";

export class JwtServiceAdapter implements IjwtService {
	constructor(private jwtService: JwtService) {}

	sign(payload: Buffer | object): string {
		return this.jwtService.sign(payload);
	}
}
