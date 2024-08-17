import { Test, TestingModule } from "@nestjs/testing";
import { ShotenedUrlService } from "./shotened-url.service";

describe("ShotenedUrlService", () => {
	let service: ShotenedUrlService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ShotenedUrlService],
		}).compile();

		service = module.get<ShotenedUrlService>(ShotenedUrlService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
