declare module 'azure-sas-token' {
  function createSharedAccessToken(resourceUri: string, saPolicyName: string, saKey: string, saValidity?: number): string | Error;
}
