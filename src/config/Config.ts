
export const msalConfig = {
    appId: 'a79fd610-c111-4b27-8bcb-d122bb624b96',
    authority: 'https://login.microsoftonline.com/',
    redirectUri: 'http://localhost:3000/',
    scopes: ["User.Read"],
    azureScopes: [
        'https://management.azure.com/user_impersonation',
        'User.Read'
    ],
    azureApiScopes: [
        'https://management.azure.com/user_impersonation'
    ]
};

export const basicURLS = {
    clientservicepermissionsSaveURL: "https://localhost:44384/api/clientservicepermissions",
    fetchSubscriptionsURL: "https://management.azure.com/subscriptions?api-version=2020-01-01",
    fecthTenantsURL: "https://management.azure.com/tenants?api-version=2020-01-01",
    installationMappingURL: "https://localhost:44384/api/installationmapping",
    gitHubUserAuthURL: "https://github.com/login/oauth/authorize?client_id=Iv1.6bd7888b1e58ccad&redirect_uri=https://localhost:44384/api/usertoken&state="
}