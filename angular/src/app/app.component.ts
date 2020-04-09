import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TokenGeneratorService } from './services/token-generator.service';

export class SASToken {
	constructor(
		public resourceURI: string,
		public saName: string,
		public saKey: string,
		public expireTime?: string){}
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
	model = new SASToken(
			'https://<service namespace>.servicebus.windows.net/<topic name or queue>',
			'<signature key name>', 
			'primary key or secondary key');

	constructor(private tokenGeneratorService: TokenGeneratorService) {}

    timeRanges: string[] = [
        '1 hour',
        '2 hours',
        '1 day',
        '1 week',
        '1 month'
    ];

    onSubmit(form: FormGroup) {
		console.log(form.value);
		const formValues = form.value;
		const sasToken = this.tokenGeneratorService.createSharedAccessToken(
			formValues.resourceURIField,
			formValues.saNameField,
			formValues.saKeyField,
			/*+formValues.timeRanges*/ 60);
		console.log(`sas token: ${sasToken}`);
    }
}
