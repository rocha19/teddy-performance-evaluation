import { PrismaModule } from "@/application";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { HealthcheckerModule } from "./healthchecker/healthchecker.module";
import { ShotenedUrlModule } from "./shotened-url/shotened-url.module";
import { UserModule } from "./user/user.module";
import configuration from "./utils/env";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configuration],
		}),
		AuthModule,
		PrismaModule,
		UserModule,
		ShotenedUrlModule,
		HealthcheckerModule,
	],
})
export class AppModule {}
