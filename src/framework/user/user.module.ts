import {
	DeleteUserService,
	GetUserService,
	NewUserService,
	PrismaService,
	PrismaUserRepository,
	UpdateUserService,
} from "@/application";
import {
	CreateUserUseCase,
	DeleteUserByIdUseCase,
	FindUserByIdUseCase,
	UpdateUserByIdUseCase,
} from "@/domain";
import { UserController } from "@/interface";
import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
	imports: [AuthModule, PrismaModule],
	controllers: [UserController],
	providers: [
		GetUserService,
		NewUserService,
		UpdateUserService,
		DeleteUserService,
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
		{
			provide: FindUserByIdUseCase,
			useFactory: (repository: PrismaUserRepository) =>
				new FindUserByIdUseCase(repository),
			inject: [PrismaUserRepository],
		},
		{
			provide: UpdateUserByIdUseCase,
			useFactory: (repository: PrismaUserRepository) =>
				new UpdateUserByIdUseCase(repository),
			inject: [PrismaUserRepository],
		},
		{
			provide: DeleteUserByIdUseCase,
			useFactory: (repository: PrismaUserRepository) =>
				new DeleteUserByIdUseCase(repository),
			inject: [PrismaUserRepository],
		},
	],
})
export class UserModule {}
