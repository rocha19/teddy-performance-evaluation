import { AuthService } from "@/application";
import { Test, TestingModule } from "@nestjs/testing";

describe.skip("AuthService", () => {
	let service: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [AuthService],
		}).compile();

		service = module.get<AuthService>(AuthService);
	});

	it.skip("should be defined", () => {
		expect(service).toBeDefined();
	});
});
