import React from 'react';
import renderer from 'react-test-renderer';
import UserPermissions from '../../components/onBoardingTemplate/UserPermissions';
import { onBoardingObject } from "../../components/onBoardingTemplate/OnBoardingTemplate";
import { mount } from "enzyme";

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

test('renders user permissions with default values', () => {
    const basicDetails = renderer.create(<UserPermissions
        onBoardingTemplateObject={onBoardingTemplateObject} setTemplateState={setTemplateState} />).toJSON();
    expect(basicDetails).toMatchSnapshot()
});