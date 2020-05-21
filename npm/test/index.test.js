const azureSasToken = require('../src/index');

describe('Azure Sas Token', () => {
	const MOCK_VALID_PARAM_1 = 'https://my-namespace.servicebus.windows.net/queueName';
	const MOCK_VALID_PARAM_2 = 'default';
	const MOCK_VALID_PARAM_3 = '1380966698541616202';
	const MOCK_VALID_PARAM_4 = 7200;

	test(`on missing param 'resourceUri' should throws an exception`, ()=> {
		expect(() => {
			azureSasToken.createSharedAccessToken(undefined, MOCK_VALID_PARAM_2, MOCK_VALID_PARAM_3);
			}).toThrowError('Missing required parameter');
	});	

	test(`on missing param 'saPolicyName' should throws an exception`, ()=>{
		expect(() => {
			azureSasToken.createSharedAccessToken(MOCK_VALID_PARAM_1, undefined, MOCK_VALID_PARAM_3);
			}).toThrowError('Missing required parameter');
	});

	test(`on missing param 'saKey' should throws an exception`, ()=>{
		expect(() => {
			azureSasToken.createSharedAccessToken(MOCK_VALID_PARAM_1, MOCK_VALID_PARAM_2, undefined);
			}).toThrowError('Missing required parameter');
	});

	test(`on missing optional param 'saValidity' should NOT throws an exception`, ()=>{
		expect(() => {
			azureSasToken.createSharedAccessToken(MOCK_VALID_PARAM_1, MOCK_VALID_PARAM_2, MOCK_VALID_PARAM_3, MOCK_VALID_PARAM_4);
			}).not.toThrowError('Missing required parameter');
	});

	test(`on getting valids params should calculate a valid token`, ()=>{
		const result = 	azureSasToken.createSharedAccessToken(MOCK_VALID_PARAM_1, MOCK_VALID_PARAM_2, MOCK_VALID_PARAM_3);
		expect(result).toContain('SharedAccessSignature sr=https%3A%2F%2Fmy-namespace.servicebus.windows.net%2FqueueName&sig=');
		expect(result).toContain('%3D&se=');
		expect(result).toContain('&skn=default');
	});

	test(`on providing optional 'saValidity' param, should generate token with provided expiration time`, ()=>{
		const result = 	azureSasToken.createSharedAccessToken(MOCK_VALID_PARAM_1, MOCK_VALID_PARAM_2, MOCK_VALID_PARAM_3, MOCK_VALID_PARAM_4);
		expect(result).toContain('SharedAccessSignature sr=https%3A%2F%2Fmy-namespace.servicebus.windows.net%2FqueueName&sig=');
		expect(result).toContain('%3D&se=');
		expect(result).toContain('&skn=default');
	});
});