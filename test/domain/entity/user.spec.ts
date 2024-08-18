import { User } from "@/domain";

const email = "any@email.com";
const password = "123456";

describe("Validation user", () => {
	it("Should accept only valid email actor ", () => {
		const sut = new User(email, password);
		expect(sut).toBeTruthy();
	});
	// it('Should accept name actor even not being registered in the database ', () => {
	//   const actor = 'João Luiz'
	//   const sut = Name.validator(actor)
	//   expect(sut).toBeTruthy()
	// })
	// it('Should not accept string empty ', () => {
	//   const actor = ''
	//   const sut = Name.validator(actor)
	//   expect(sut).toBeFalsy()
	// })
	// it('Should accept only first name actor', () => {
	//   const actor = 'Agatha'
	//   const sut = Name.validator(actor)
	//   expect(sut).toBeTruthy()
	// })
	// it('Should accept only second name actor', () => {
	//   const actor = 'Silva'
	//   const sut = Name.validator(actor)
	//   expect(sut).toBeTruthy()
	// })
	// it('Should not accept actor langer than 40 syllables in first name actor', () => {
	//   //duvida!
	//   const actor = 'Rejan' + 'e'.repeat(70)
	//   const sut = Name.validator(actor)
	//   expect(sut).toBeFalsy()
	// })
});
