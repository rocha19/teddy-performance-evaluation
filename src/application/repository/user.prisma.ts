import { Repository, ShortenedUrl, User } from "@/domain";
import { PrismaService } from "../usecase";

export class PrismaUserRepository implements Repository<User> {
	constructor(private prismaService: PrismaService) {}
	async findById(id: string): Promise<User> {
		const user = await this.prismaService.user.findUnique({
			where: { id },
			include: { ShortenedUrl: true },
		});

		return user ? this.mapPrismaUserToUser(user) : null;
	}

	async create(user: User): Promise<void> {
		const prismaUserData: PrismaUserData = {
			id: user.id,
			email: user.email,
			password: user.password,
			createdAt: user.createdAt && new Date(user.createdAt),
			updatedAt: user.updatedAt && new Date(user.updatedAt),
			ShortenedUrl:
				user.shortenedUrl.length > 0
					? {
							create: user.shortenedUrl.map((url) => ({
								id: url.id,
								originalUrl: url.originalUrl,
								shortUrl: url.shortUrl,
								clickCount: url.clickCount,
								createdAt: url.createdAt && new Date(url.createdAt),
								updatedAt: url.updatedAt && new Date(url.updatedAt),
								userId: url.userId,
								isDeleted: url.isDeleted && url.isDeleted,
							})),
						}
					: undefined,
		};

		await this.prismaService.user.create({
			data: prismaUserData,
		});
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await this.prismaService.user.findUnique({
			where: { email },
			include: { ShortenedUrl: true },
		});

		return user ? this.mapPrismaUserToUser(user) : null;
	}

	async findByIdAndUpdate(
		id: string,
		updatedUser: Partial<User>,
	): Promise<void> {
		await this.prismaService.user.update({
			where: { id },
			data: {
				email: updatedUser.email,
				password: updatedUser.password,
				createdAt: updatedUser.createdAt
					? new Date(updatedUser.createdAt)
					: undefined,
				updatedAt: updatedUser.updatedAt
					? new Date(updatedUser.updatedAt)
					: undefined,
			},
			include: { ShortenedUrl: true },
		});
	}

	async findByIdAndDelete(id: string): Promise<void> {
		await this.prismaService.user.delete({
			where: { id },
			include: { ShortenedUrl: true },
		});
	}

	async findAll(): Promise<User[]> {
		const users = await this.prismaService.user.findMany({
			include: { ShortenedUrl: true },
		});

		return users.map(this.mapPrismaUserToUser);
	}

	private mapPrismaUserToUser(prismaUser: PrismaUser): User {
		return new User(
			prismaUser.email,
			prismaUser.password,
			prismaUser.ShortenedUrl.map(
				(url) =>
					new ShortenedUrl(
						url.originalUrl,
						`${process.env.DOMAIN}/${url.shortUrl}`,
						url.clickCount,
						url.userId,
						url.createdAt.toISOString(),
						url.updatedAt.toISOString(),
						url.isDeleted && url.isDeleted,
						url.id,
					),
			),
			prismaUser.createdAt.toISOString(),
			prismaUser.updatedAt.toISOString(),
			prismaUser.id,
		);
	}
}

type PrismaUserData = {
	id?: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
	ShortenedUrl?: {
		create?: {
			id: string;
			originalUrl: string;
			shortUrl: string;
			clickCount: number;
			createdAt: Date;
			updatedAt: Date;
			userId?: string;
			isDeleted?: boolean;
		}[];
	};
};

type PrismaShortenedUrl = {
	id: string;
	originalUrl: string;
	shortUrl: string;
	clickCount: number;
	createdAt: Date;
	updatedAt: Date;
	userId?: string;
	isDeleted?: boolean;
};

type PrismaUser = {
	id?: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
	ShortenedUrl: PrismaShortenedUrl[];
};
