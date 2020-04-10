export class SASToken {
	constructor(
		public resourceURI: string,
		public saName: string,
		public saKey: string,
		public expireTime?: string){}
}