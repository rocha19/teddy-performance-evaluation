import { HealthcheckerService } from "@/application/usecase/healthchecker/healthchecker.service";
import { Controller, Get } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("API Health")
@Controller()
export class HealthcheckerController {
	constructor(private readonly healthcheckerService: HealthcheckerService) {}

	@Get()
	@ApiResponse({
		status: 200,
		description: "Health check completed successfully.",
	})
	async getApiHealth() {
		return await this.healthcheckerService.execute();
	}
}
