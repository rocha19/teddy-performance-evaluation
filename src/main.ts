import { NestFactory } from "@nestjs/core";
import { AppModule } from "./framework";
import { PrismaExceptionFilter } from "./interface";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalFilters(new PrismaExceptionFilter());
	await app.listen(process.env.PORT);
}
bootstrap();
