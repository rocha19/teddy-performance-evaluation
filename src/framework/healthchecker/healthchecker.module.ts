import { HealthcheckerService } from "@/application/usecase/healthchecker/healthchecker.service";
import { HealthcheckerController } from "@/interface";
import { Module } from "@nestjs/common";

@Module({
	controllers: [HealthcheckerController],
	providers: [HealthcheckerService],
})
export class HealthcheckerModule {}
