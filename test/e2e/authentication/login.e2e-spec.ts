import { randomUUID } from "node:crypto";
import { AppModule } from "@/framework";
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";

describe("User Login (e2e)", () => {
	let userId: string;
	let app: INestApplication;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();

		userId = randomUUID();

		const registerResponse = await request(app.getHttpServer())
			.post("/api/user")
			.send({
				email: `${userId}@gmail.com`,
				password: "1234567",
			});

		expect(registerResponse.status).toBe(201);
	});

	afterAll(async () => {
		await app.close();
	});

	it("POST /api/login - Login with registered user", async () => {
		const response = await request(app.getHttpServer())
			.post("/api/login")
			.send({
				email: `${userId}@gmail.com`,
				password: "1234567",
			});

		expect(response.status).toBe(200);
	});
});
