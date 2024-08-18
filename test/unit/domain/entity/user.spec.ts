import { User } from "@/domain/entity";

const email = "any@email.com";
const password = "123456";
const invalidEmail = "invalid-email";
const invalidPassword = "123";
const createdAt = "2024-08-18T12:34:56Z";
const invalidCreatedAt = "invalid-date";
const updatedAt = "2024-08-18T13:34:56Z";
const invalidUpdatedAt = "invalid-date";
const id = "749ce916-51c3-4df9-9cda-460ccc0f579c";
const invalidId = "invalid-id";

describe("Validation user", () => {
	it("Should create a User instance with valid attributes", () => {
		const sut = new User(email, password, [], createdAt, updatedAt, id);
		expect(sut).toBeInstanceOf(User);
	});

	it("Should throw an error if the email is invalid", () => {
		expect(() => new User(invalidEmail, password)).toThrow(
			"Invalid email or password",
		);
	});

	it("Should throw an error if the password is invalid", () => {
		const sut = new User(email, password);
		// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
		expect(() => (sut.password = invalidPassword)).toThrow(
			"Invalid email or password",
		);
	});

	it("Should throw an error if createdAt is invalid", () => {
		expect(() => new User(email, password, [], invalidCreatedAt)).toThrow(
			"Invalid createdAt",
		);
	});

	it("Should throw an error if updatedAt is invalid", () => {
		expect(
			() => new User(email, password, [], createdAt, invalidUpdatedAt),
		).toThrow("Invalid updatedAt");
	});

	it("Should throw an error if id is invalid", () => {
		expect(
			() => new User(email, password, [], createdAt, updatedAt, invalidId),
		).toThrow("Invalid id");
	});
});
