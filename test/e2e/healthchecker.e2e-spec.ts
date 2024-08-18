import { AppModule } from "@/framework";
import type { INestApplication } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import * as request from "supertest";

describe("AppController (e2e)", () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it("/ (GET)", async () => {
		const response = await request(app.getHttpServer()).get("/");

		expect(response.status).toBe(200);
		expect(response.headers["content-type"]).toContain("text/html");
		expect(response.text).toContain("API running is OK!");
		expect(response.text).toContain("<h1>Status</h1>");
		expect(response.text).toContain("<p>API running is OK!</p>");
	});
});
