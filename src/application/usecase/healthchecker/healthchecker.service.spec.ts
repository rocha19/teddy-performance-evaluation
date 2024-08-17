import { Test, TestingModule } from "@nestjs/testing";
import { HealthcheckerService } from "./healthchecker.service";

describe("HealthcheckerService", () => {
	let service: HealthcheckerService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [HealthcheckerService],
		}).compile();

		service = module.get<HealthcheckerService>(HealthcheckerService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
