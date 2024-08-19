import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./framework";
import { PrismaExceptionFilter } from "./interface";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalFilters(new PrismaExceptionFilter());

	const config = new DocumentBuilder()
		.setTitle("API documentation with Swagger")
		.setVersion("1.0")
		.addTag("API Health")
		.addTag("User")
		.addTag("Login")
		.addTag("Shortener URL")
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, document);

	await app.listen(process.env.PORT);
	console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
