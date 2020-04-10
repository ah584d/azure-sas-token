import { Component } from '@angular/core';
import { TokenGeneratorService } from './services/token-generator/token-generator.service';
import { SASToken } from './model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
	constructor(private tokenGeneratorService: TokenGeneratorService) {}

	sasToken: string;

	model = new SASToken(
			// 'https://<service namespace>.servicebus.windows.net/<topic name or queue>',
			// '<signature key name>', 
			// 'primary key or secondary key'
			);

    timeRanges: any[] = [
		{ key : '1 hour', value : 1 },
		{ key : '2 hours', value : 2 },
		{ key : '1 day', value : 24 },
		{ key : '1 week', value : 168 },
		{ key : '1 month', value : 720 }
    ];

    onSubmit(form) {
		console.log(form.value);
		this.sasToken='';
		const formValues = form.value;
		const sasToken = this.tokenGeneratorService.createSharedAccessToken(
			formValues.resourceURIField,
			formValues.saNameField,
			formValues.saKeyField,
			+formValues.timeRangesField.value);
		console.log(`sas token: ${sasToken}`);
		if(sasToken) {
			this.sasToken = sasToken;
		}
    }
}
