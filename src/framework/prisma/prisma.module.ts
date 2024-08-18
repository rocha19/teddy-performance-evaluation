import { PrismaService } from "@/application/usecase/prisma/prisma.service";
import { Global, Module } from "@nestjs/common";

@Global()
@Module({
	providers: [PrismaService],
	exports: [PrismaService],
})
export class PrismaModule {}
