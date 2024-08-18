import {
	AuthService,
	JwtServiceAdapter,
	JwtStrategyService,
	PrismaService,
	PrismaUserRepository,
} from "@/application";
import { JwtServiceToken } from "@/domain";
import { Login } from "@/domain/usecase/login";
import { AuthController } from "@/interface";
import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
	imports: [
		JwtModule.register({
			secret: process.env.JWT_SECRET || "",
			signOptions: { expiresIn: "20s" },
		}),
		PrismaModule,
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		JwtStrategyService,
		{
			provide: PrismaUserRepository,
			useFactory: (prismaService: PrismaService) =>
				new PrismaUserRepository(prismaService),
			inject: [PrismaService],
		},
		{
			provide: JwtServiceToken,
			useClass: JwtServiceAdapter,
		},
		{
			provide: JwtServiceAdapter,
			useFactory: (jwtService: JwtService) => new JwtServiceAdapter(jwtService),
			inject: [JwtService],
		},
		{
			provide: Login,
			useFactory: (
				jwtService: JwtServiceAdapter,
				repository: PrismaUserRepository,
			) => new Login(jwtService, repository),
			inject: [JwtServiceAdapter, PrismaUserRepository],
		},
	],
})
export class AuthModule {}
