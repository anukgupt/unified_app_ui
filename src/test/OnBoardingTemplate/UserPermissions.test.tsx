import React from 'react';
import renderer from 'react-test-renderer';
import UserPermissions from '../../components/onBoardingTemplate/UserPermissions';
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

test('renders user permissions with default values', () => {
    const userPermissionsUI = renderer.create(<UserPermissions
        onBoardingTemplateObject={onBoardingTemplateObject} setTemplateState={setTemplateState} />).toJSON();
    expect(userPermissionsUI).toMatchSnapshot()
});

test('test selectmenu', () => {
    const userPermissionsUI = mount(<UserPermissions onBoardingTemplateObject={onBoardingTemplateObject} setTemplateState={setTemplateState} />);
    expect(userPermissionsUI.find('.select-menu').exists()).toBeTruthy();
});

test('test selectmenu items', () => {
    const userPermissionsUI = mount(<UserPermissions onBoardingTemplateObject={onBoardingTemplateObject} setTemplateState={setTemplateState} />);
    const selectMenuItem = userPermissionsUI.find('#blockanotheruser0').at(0);
    expect(selectMenuItem.exists()).toBeTruthy();
});