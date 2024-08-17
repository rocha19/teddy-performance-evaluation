import { HealthcheckerService } from "@/application/usecase/healthchecker/healthchecker.service";
import { Controller, Get } from "@nestjs/common";

@Controller("healthchecker")
export class HealthcheckerController {
	constructor(private readonly healthcheckerService: HealthcheckerService) {}

	@Get()
	async getHello() {
		return await this.healthcheckerService.execute();
	}
}
