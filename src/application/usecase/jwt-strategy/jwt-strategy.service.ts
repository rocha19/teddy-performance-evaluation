import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy, "jwt") {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: "672317c8-b545-4bf8-87b3-08b6c8ba3c3a",
		});
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	async validate(payload: any): Promise<any> {
		return payload; // return the user object if the JWT is valid
	}
}
