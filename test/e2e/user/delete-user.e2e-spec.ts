import { randomUUID } from "node:crypto";
import { AppModule } from "@/framework";
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as jwt from "jsonwebtoken";
import * as request from "supertest";

describe("Delete User (e2e)", () => {
	let app: INestApplication;
	let token: string;
	let userId: string;

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

		const loginResponse = await request(app.getHttpServer())
			.post("/api/login")
			.send({
				email: `${userId}@gmail.com`,
				password: "1234567",
			});

		expect(loginResponse.status).toBe(200);
		token = loginResponse.text;

		const decodedToken = jwt.decode(token) as { sub: string };
		userId = decodedToken.sub;
	});

	afterAll(async () => {
		await app.close();
	});

	it("DELETE /api/user/:id - Delete user", async () => {
		const response = await request(app.getHttpServer())
			.delete(`/api/user/${userId}`)
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(204);
	});
});
