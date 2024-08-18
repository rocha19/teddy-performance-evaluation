import { HealthcheckerService } from "@/application/usecase/healthchecker/healthchecker.service";
import { Controller, Get } from "@nestjs/common";

@Controller()
export class HealthcheckerController {
	constructor(private readonly healthcheckerService: HealthcheckerService) {}

	@Get()
	async getApiHealth() {
		return await this.healthcheckerService.execute();
	}
}
