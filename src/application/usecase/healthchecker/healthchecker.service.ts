import { Injectable } from "@nestjs/common";

@Injectable()
export class HealthcheckerService {
	async execute(): Promise<string> {
		return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Health Check</title>
        <style>
            body {
                background-color: #121212;
                color: #ffffff;
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
            }
            .container {
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Status</h1>
            <p>API running is OK!</p>
        </div>
    </body>
    </html>
     `;
	}
}
