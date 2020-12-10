import { handleResponse } from "../serviceHelper";
import { basicURLS } from "../../config/Config";
import { InstallationIdReq, SubscriptionIdsReq, TenantIdReq } from "../../Constants";

export interface IMappingInput {
    installationId: string;
    tenantId: string;
    subscriptionIds: any[];
};

export async function saveMapping(mappingInputs: IMappingInput, accessToken: string) {
    var subscriptionIds: string[] = [];
    validateMappingInputs(mappingInputs);
    mappingInputs.subscriptionIds.map(subsId => {
        subscriptionIds.push(subsId.subscriptionId)
    });
    var url = basicURLS.installationMappingURL;
    return fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': accessToken 
        }),
        body: JSON.stringify({
            "InstallationId": parseInt(mappingInputs.installationId),
            "TenantId": mappingInputs.tenantId,
            "SubscriptionIds": subscriptionIds
        })
    }).then(responseJson => {
        return handleResponse(responseJson);
    }).catch(error => {
        throw error;
    });
}

function validateMappingInputs(mappingInputs: IMappingInput) {
    if (!mappingInputs.installationId)
        throw new Error(InstallationIdReq);
    if (!mappingInputs.tenantId)
        throw new Error(TenantIdReq);
    if (!mappingInputs.subscriptionIds || mappingInputs.subscriptionIds.length === 0)
        throw new Error(SubscriptionIdsReq);

}