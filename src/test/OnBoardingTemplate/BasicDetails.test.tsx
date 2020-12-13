import React from 'react';
import renderer from 'react-test-renderer';
import BasicDetails from '../../components/onBoardingTemplate/BasicDetails';
import { onBoardingObject } from "../../components/onBoardingTemplate/OnBoardingTemplate";
import OnBoardingTemplate from '../../components/onBoardingTemplate/OnBoardingTemplate';
import { shallow, mount } from "enzyme";
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

const onBoardingUI = mount(<OnBoardingTemplate />);
const onClientIdChange = jest.fn(() => {
    onBoardingUI.setState({
        clientId: "test clientid",
    });
});
const onWebhookURLChange = jest.fn(() => {
    onBoardingUI.setState({
        webhookURL: "test webhookurl",
    });
});
const onCallbackURLChange = jest.fn(() => {
    onBoardingUI.setState({
        callbackURL: "test callbackurl",
    });
});

test('renders correctly all components with no errors', () => {
    const basicDetails = renderer.create(<BasicDetails
        onBoardingTemplateObject={onBoardingTemplateObject} onClientIdChange={onClientIdChange} onWebhookURLChange={onWebhookURLChange} onCallbackURLChange={onCallbackURLChange} />).toJSON();
    expect(basicDetails).toMatchSnapshot()
});

test('render input clientid', () => {
    const basicDetails = mount(<BasicDetails
        onBoardingTemplateObject={onBoardingTemplateObject} onClientIdChange={onClientIdChange} onWebhookURLChange={onWebhookURLChange} onCallbackURLChange={onCallbackURLChange} />);
    basicDetails.find('input').at(0).simulate('change', 'test clientid');
    expect(onClientIdChange).toHaveBeenCalledTimes(1);
    expect(onBoardingUI.state()).toStrictEqual({ "clientId": "test clientid", "currentAuthority": "", "error": null, "isAuthenticated": false, "user": {} });
});

test('render input webhookurl', () => {
    let basicDetails = mount(<BasicDetails
        onBoardingTemplateObject={onBoardingTemplateObject} onClientIdChange={onClientIdChange} onWebhookURLChange={onWebhookURLChange} onCallbackURLChange={onCallbackURLChange} />);
    basicDetails.find('input').at(1).simulate('change', 'test webhookurl');
    expect(onWebhookURLChange).toHaveBeenCalledTimes(1);
    expect(onBoardingUI.state()).toStrictEqual({ "clientId": "test clientid", "webhookURL": "test webhookurl", "currentAuthority": "", "error": null, "isAuthenticated": false, "user": {} });
});

test('render input callbackurl', () => {
    const basicDetails = mount(<BasicDetails
        onBoardingTemplateObject={onBoardingTemplateObject} onClientIdChange={onClientIdChange} onWebhookURLChange={onWebhookURLChange} onCallbackURLChange={onCallbackURLChange} />);
    basicDetails.find('input').at(2).simulate('change', 'test callbackurl');
    expect(onCallbackURLChange).toHaveBeenCalledTimes(1);
    expect(onBoardingUI.state()).toStrictEqual({ "clientId": "test clientid", "webhookURL": "test webhookurl", "callbackURL": "test callbackurl", "currentAuthority": "", "error": null, "isAuthenticated": false, "user": {} });
});

test('render buttons', () => {
    expect(onBoardingUI.find('.create-configuration')).toBeTruthy();
    expect(onBoardingUI.find('.previous-configuration')).toBeTruthy();
    expect(onBoardingUI.find('.next-configuration')).toBeTruthy();
})
