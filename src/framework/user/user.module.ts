import {
	PrismaModule,
	PrismaService,
	PrismaUserRepository,
	UserService,
} from "@/application";
import { CreateUserUseCase } from "@/domain";
import { UserController } from "@/interface";
import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";

@Module({
	imports: [AuthModule, PrismaModule],
	controllers: [UserController],
	providers: [
		UserService,
		{
			provide: PrismaUserRepository,
			useFactory: (prismaService: PrismaService) =>
				new PrismaUserRepository(prismaService),
			inject: [PrismaService],
		},
		{
			provide: CreateUserUseCase,
			useFactory: (repository: PrismaUserRepository) =>
				new CreateUserUseCase(repository),
			inject: [PrismaUserRepository],
		},
	],
})
export class UserModule {}
