import { randomUUID } from "node:crypto";
import { AppModule } from "@/framework";
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";

describe("User Registration (e2e)", () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	it("POST /api/user - Register a new user", async () => {
		const response = await request(app.getHttpServer())
			.post("/api/user")
			.send({
				email: `${randomUUID()}@gmail.com`,
				password: "1234567",
			});

		expect(response.status).toBe(201);
	});
});
