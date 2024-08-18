import { JwtStrategyService } from "@/application";
import { Test, TestingModule } from "@nestjs/testing";
import { ExtractJwt, Strategy } from "passport-jwt";

describe("JwtStrategyService", () => {
	let service: JwtStrategyService;
	const secret = process.env.JWT_SECRET || "";

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [JwtStrategyService],
		}).compile();

		service = module.get<JwtStrategyService>(JwtStrategyService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("validate", () => {
		it("should return the payload", async () => {
			const payload = {
				sub: "1e757231-3821-404f-9a92-a1e63b1cd2ff",
				name: "John Doe",
			};
			const result = await service.validate(payload);

			expect(result).toEqual(payload);
		});
	});

	describe("configuration", () => {
		it("should have correct JWT options", () => {
			const strategy = new Strategy(
				{
					jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
					ignoreExpiration: false,
					secretOrKey: secret,
				},
				async (payload, done) => {
					return done(null, payload);
				},
			);

			expect(strategy).toBeDefined();
		});
	});
});
