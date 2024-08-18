import { randomUUID } from "node:crypto";
import { AppModule } from "@/framework";
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";

describe.skip("URL Shortener (e2e) - Delete Shortened URL", () => {
	let app: INestApplication;
	let token: string;
	const userId = "c01f53a2-f4db-47e7-977a-612f694a5bd7"; // Substitua pelo ID do usuário
	const shortenedUrlId = "6ca65f16-dfb6-4db5-83bc-4bc3fe5d65e9"; // Substitua pelo ID da URL encurtada

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();

		const loginResponse = await request(app.getHttpServer())
			.post("/api/login")
			.send({
				email: "johndoe@email.com",
				password: "123456",
			});

		token = loginResponse.body.access_token;
	});

	afterAll(async () => {
		await app.close();
	});

	it("DELETE /api/shortener/:userId/:shortenedUrlId - Delete shortened URL", async () => {
		const response = await request(app.getHttpServer())
			.delete(`/api/shortener/${userId}/${shortenedUrlId}`)
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(204);
	});
});
