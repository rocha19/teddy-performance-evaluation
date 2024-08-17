export interface Repository<T> {
	findByEmail(email: string): Promise<T>;
	findById(id: string): Promise<T>;
	findByIdAndUpdate(id: string, updatedT: Partial<T>): Promise<void>;
	findByIdAndDelete(id: string, nextId?: string): Promise<void>;
	create(data: T, id?: string): Promise<void>;
	findAll(): Promise<T[]>;
}
