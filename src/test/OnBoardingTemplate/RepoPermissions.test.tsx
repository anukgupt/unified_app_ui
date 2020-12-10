import React from 'react';
import renderer from 'react-test-renderer';
import RepoPermissions from '../../components/onBoardingTemplate/RepoPermissions';
import { onBoardingObject } from "../../components/onBoardingTemplate/OnBoardingTemplate";
import { shallow, } from "enzyme";

const onBoardingTemplateObject: onBoardingObject = {
    clientId: "",
    clientIdError: false,
    webhookURL: "",
    webhookURLError: false,
    callbackURL: "",
    callbackURLError: false,
    repoPermissions: {},
    orgPermissions: {},
    userPermissions: {},
    domainList: [],
    showOnBoardingTemplate: true,
    isUserAuthorized: false
}
const setTemplateState = jest.fn();

test('renders repo permissions with default values', () => {
    const basicDetails = renderer.create(<RepoPermissions
        onBoardingTemplateObject={onBoardingTemplateObject} setTemplateState={setTemplateState} />).toJSON();
    expect(basicDetails).toMatchSnapshot()
});