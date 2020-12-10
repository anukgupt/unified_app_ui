import * as Constants from "../../Constants";
import { onBoardingObject } from "../../components/onBoardingTemplate/OnBoardingTemplate";
import { handleResponse } from "../serviceHelper";
import { basicURLS } from "../../config/Config";

export async function saveTemplateMapping(onBoardingTemplateObject: onBoardingObject, accessToken: string) {
    const url = basicURLS.clientservicepermissionsSaveURL;
    let permissions: { [key: string]: string } = {};
    Object.keys(onBoardingTemplateObject.repoPermissions).forEach((key: any) => {
        if (onBoardingTemplateObject.repoPermissions[key] !== Constants.NoAccess) {
            permissions[key] = onBoardingTemplateObject.repoPermissions[key];
        }
    });
    Object.keys(onBoardingTemplateObject.orgPermissions).forEach((key: any) => {
        if (onBoardingTemplateObject.orgPermissions[key] !== Constants.NoAccess) {
            permissions[key] = onBoardingTemplateObject.orgPermissions[key];
        }
    });
    Object.keys(onBoardingTemplateObject.userPermissions).forEach((key: any) => {
        if (onBoardingTemplateObject.userPermissions[key] !== Constants.NoAccess) {
            permissions[key] = onBoardingTemplateObject.userPermissions[key];
        }
    });
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': accessToken },
        body: JSON.stringify({ ClientId: onBoardingTemplateObject.clientId, CallbackURL: onBoardingTemplateObject.callbackURL, Permissions: permissions }),
    };
    fetch(url, requestOptions)
        .then(async response => {
            return handleResponse(response);
        })
        .catch(error => {
            throw error;
        });
}