import React from 'react';
import renderer from 'react-test-renderer';
import RepoPermissions from '../../components/onBoardingTemplate/RepoPermissions';
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

test('renders repo permissions with default values', () => {
    const basicDetails = renderer.create(<RepoPermissions
        onBoardingTemplateObject={onBoardingTemplateObject} setTemplateState={setTemplateState} />).toJSON();
    expect(basicDetails).toMatchSnapshot()
});

test('test selectmenu', () => {
    const tenantsUI = mount(<RepoPermissions onBoardingTemplateObject={onBoardingTemplateObject} setTemplateState={setTemplateState} />);
    expect(tenantsUI.find('.select-menu').exists()).toBeTruthy();
});