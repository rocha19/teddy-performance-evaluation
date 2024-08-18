import { randomUUID } from "node:crypto";
import { AppModule } from "@/framework";
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";

describe.skip("URL Shortener (e2e) - Get Original URL access without authorization", () => {
	let app: INestApplication;
	let token: string;
	const shortenedUrlCode = "otemco"; // Substitua pelo código de URL encurtada gerado no teste de criação

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

	it("GET /api/:code - Access original URL by shortened URL", async () => {
		const response = await request(app.getHttpServer())
			.get(`/api/${shortenedUrlCode}`)
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(302); // Redirecionamento
		expect(response.header.location).toBe(
			"https://www.google.com/search?sca_esv=5f833fc7e19dbbb8&sca_upv=1&q=happy+image&udm=2&fbs=AEQNm0AuaLfhdrtx2b9ODfK0pnmi046uB92frSWoVskpBryHTrdWqiVbaH6EqK0Fq9hkAkqRDuhGs7UQnPtZiL0Bzcj78aaFR2vnR4DfQyahVzxKNVahghfRWcP18tIQDI-SEd9Equ5g0GYsIG8jai2_zN8y16CRuLHNs28Ydr3E9AarJg4DUYUsqKibma7jzI96q7Qwb-v6RNSYne1ZlQPcwLjO_sXAfA&sa=X&ved=2ahUKEwjs7-TIhPqHAxVSrZUCHecELmYQtKgLegQIFRAB&biw=1299&bih=707&dpr=1",
		);
	});
});
