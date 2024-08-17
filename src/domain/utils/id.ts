import { InvalidIdError } from "@/domain/errors";
import { Either, left, right } from "@/domain/utils";
export class Id {
	public readonly value: string;
	private constructor(id: string) {
		this.value = id;
	}
	public static register(id: string): Either<InvalidIdError, Id> {
		if (!Id.validator(id)) {
			return left(new InvalidIdError(id));
		}
		return right(new Id(id));
	}
	public static validator(id: string): boolean {
		if (!id) {
			return false;
		}
		const regex =
			/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gm;
		if (!regex.test(id)) {
			return false;
		}
		return true;
	}
}
