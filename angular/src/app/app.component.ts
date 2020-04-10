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
			'https://<service namespace>.servicebus.windows.net/<topic name or queue>',
			'<signature key name>', 
			'primary key or secondary key');

    timeRanges: string[] = [
        '1 hour',
        '2 hours',
        '1 day',
        '1 week',
        '1 month'
    ];

    onSubmit(form) {
		console.log(form.value);
		this.sasToken='';
		const formValues = form.value;
		const sasToken = this.tokenGeneratorService.createSharedAccessToken(
			formValues.resourceURIField,
			formValues.saNameField,
			formValues.saKeyField,
			/*+formValues.timeRanges*/ 60);
		console.log(`sas token: ${sasToken}`);
		if(sasToken) {
			this.sasToken = sasToken;
		}
    }
}
