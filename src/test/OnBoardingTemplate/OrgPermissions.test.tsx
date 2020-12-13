import React from 'react';
import renderer from 'react-test-renderer';
import OrgPermissions from '../../components/onBoardingTemplate/OrgPermissions';
import { onBoardingObject } from "../../components/onBoardingTemplate/OnBoardingTemplate";
import { mount } from "enzyme";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

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
    showOnBoardingTemplate: true,
    isUserAuthorized: false,
    isTemplateSucessfullySaved: false,
    selectedTabIndex: 0,
    isUserAdminFlowInProcess: true
}
const setTemplateState = jest.fn();

test('renders org permissions with default values', () => {
    const basicDetails = renderer.create(<OrgPermissions
        onBoardingTemplateObject={onBoardingTemplateObject} setTemplateState={setTemplateState} />).toJSON();
    expect(basicDetails).toMatchSnapshot()
});

test('test selectmenu', () => {
    const tenantsUI = mount(<OrgPermissions onBoardingTemplateObject={onBoardingTemplateObject} setTemplateState={setTemplateState} />);
    expect(tenantsUI.find('.select-menu').exists()).toBeTruthy();
});