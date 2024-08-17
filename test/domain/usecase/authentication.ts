export interface Authentication {
	execute(email: string, password: string): Promise<string>;
}

export interface IjwtService {
	sign(payload: Buffer | object): string;
}

export const JwtServiceToken = Symbol("JwtServiceToken");
