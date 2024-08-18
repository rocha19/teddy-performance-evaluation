import { randomUUID } from "node:crypto";
import { AppModule } from "@/framework";
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as jwt from "jsonwebtoken";
import * as request from "supertest";

describe("URL Shortener (e2e) - Create Shortened URL", () => {
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

	it("POST /api/shortener - Create a shortened URL", async () => {
		const response = await request(app.getHttpServer())
			.post("/api/shortener")
			.set("Authorization", `Bearer ${token}`)
			.send({
				url: "https://www.google.com/search?sca_esv=5f833fc7e19dbbb8&sca_upv=1&q=happy+image&udm=2&fbs=AEQNm0AuaLfhdrtx2b9ODfK0pnmi046uB92frSWoVskpBryHTrdWqiVbaH6EqK0Fq9hkAkqRDuhGs7UQnPtZiL0Bzcj78aaFR2vnR4DfQyahVzxKNVahghfRWcP18tIQDI-SEd9Equ5g0GYsIG8jai2_zN8y16CRuLHNs28Ydr3E9AarJg4DUYUsqKibma7jzI96q7Qwb-v6RNSYne1ZlQPcwLjO_sXAfA&sa=X&ved=2ahUKEwjs7-TIhPqHAxVSrZUCHecELmYQtKgLegQIFRAB&biw=1299&bih=707&dpr=1",
			});

		expect(response.status).toBe(201);
	});
});
