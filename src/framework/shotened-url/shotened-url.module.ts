import {
	AccessShotenedUrlService,
	DeleteShortUrlService,
	NewShotenedUrlService,
	PrismaService,
	PrismaShortenedUrlRepository,
	UpdateShortUrlService,
} from "@/application";
import {
	AccessShortUrlAuthenticatedUseCase,
	AccessShortUrlUnauthenticatedUseCase,
	DeleteShortUrlByIdUseCase,
	NewShortUrlAuthenticatedUseCase,
	NewShortUrlUnauthenticatedUseCase,
	UpdateShortUrlByIdUseCase,
} from "@/domain";
import { ShotenedUrlController } from "@/interface";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthModule } from "../auth/auth.module";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
	imports: [
		JwtModule.register({
			secret: process.env.JWT_SECRET || "",
			signOptions: { expiresIn: "20s" },
		}),
		AuthModule,
		PrismaModule,
	],
	controllers: [ShotenedUrlController],
	providers: [
		NewShotenedUrlService,
		AccessShotenedUrlService,
		UpdateShortUrlService,
		DeleteShortUrlService,
		{
			provide: PrismaShortenedUrlRepository,
			useFactory: (prismaService: PrismaService) =>
				new PrismaShortenedUrlRepository(prismaService),
			inject: [PrismaService],
		},
		{
			provide: NewShortUrlAuthenticatedUseCase,
			useFactory: (repository: PrismaShortenedUrlRepository) =>
				new NewShortUrlAuthenticatedUseCase(repository),
			inject: [PrismaShortenedUrlRepository],
		},
		{
			provide: AccessShortUrlAuthenticatedUseCase,
			useFactory: (repository: PrismaShortenedUrlRepository) =>
				new AccessShortUrlAuthenticatedUseCase(repository),
			inject: [PrismaShortenedUrlRepository],
		},
		{
			provide: UpdateShortUrlByIdUseCase,
			useFactory: (repository: PrismaShortenedUrlRepository) =>
				new UpdateShortUrlByIdUseCase(repository),
			inject: [PrismaShortenedUrlRepository],
		},
		{
			provide: DeleteShortUrlByIdUseCase,
			useFactory: (repository: PrismaShortenedUrlRepository) =>
				new DeleteShortUrlByIdUseCase(repository),
			inject: [PrismaShortenedUrlRepository],
		},
		{
			provide: NewShortUrlUnauthenticatedUseCase,
			useClass: NewShortUrlUnauthenticatedUseCase,
		},
		{
			provide: AccessShortUrlUnauthenticatedUseCase,
			useClass: AccessShortUrlUnauthenticatedUseCase,
		},
	],
})
export class ShotenedUrlModule {}
