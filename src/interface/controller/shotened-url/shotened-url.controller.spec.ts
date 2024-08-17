import { Test, TestingModule } from "@nestjs/testing";
import { ShotenedUrlController } from "./shotened-url.controller";

describe("ShotenedUrlController", () => {
	let controller: ShotenedUrlController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ShotenedUrlController],
		}).compile();

		controller = module.get<ShotenedUrlController>(ShotenedUrlController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
