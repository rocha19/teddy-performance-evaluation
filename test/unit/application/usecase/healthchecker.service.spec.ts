import { HealthcheckerService } from "@/application/usecase/healthchecker/healthchecker.service";
import { Test, TestingModule } from "@nestjs/testing";

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

	describe("execute", () => {
		it("should return the correct HTML content", async () => {
			const expectedHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Health Check</title>
        <style>
            body {
                background-color: #121212;
                color: #ffffff;
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
            }
            .container {
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Status</h1>
            <p>API running is OK!</p>
        </div>
    </body>
    </html>
     `.trim(); // .trim() remove espaços em branco no início e no final

			const result = await service.execute();

			expect(result.trim()).toBe(expectedHtml);
		});
	});
});
