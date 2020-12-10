import React from 'react';
import renderer from 'react-test-renderer';
import BasicDetails from '../../components/onBoardingTemplate/BasicDetails';
import { onBoardingObject } from "../../components/onBoardingTemplate/OnBoardingTemplate";
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
    domainList: [],
    showOnBoardingTemplate: true,
    isUserAuthorized: false
}
const onClientIdChange = jest.fn();
const onWebhookURLChange = jest.fn();
const onCallbackURLChange = jest.fn();

test('renders correctly all components with no errors', () => {
    const basicDetails = renderer.create(<BasicDetails
        onBoardingTemplateObject={onBoardingTemplateObject} onClientIdChange={onClientIdChange} onWebhookURLChange={onWebhookURLChange} onCallbackURLChange={onCallbackURLChange} />).toJSON();
    expect(basicDetails).toMatchSnapshot()
});

test('render input clientid', () => {
    const wrapper = shallow(<BasicDetails
        onBoardingTemplateObject={onBoardingTemplateObject} onClientIdChange={onClientIdChange} onWebhookURLChange={onWebhookURLChange} onCallbackURLChange={onCallbackURLChange} />);
    wrapper.find('input').at(0).simulate('change', 'test clientid');
    expect(onClientIdChange).toHaveBeenCalledWith('test clientid');
});

test('render input webhookurl', () => {
    let wrapper = shallow(<BasicDetails
        onBoardingTemplateObject={onBoardingTemplateObject} onClientIdChange={onClientIdChange} onWebhookURLChange={onWebhookURLChange} onCallbackURLChange={onCallbackURLChange} />);
    wrapper = wrapper.find('input');
    wrapper.find('input').at(1).simulate('change', 'test webhookurl');
    expect(onWebhookURLChange).toHaveBeenCalledWith('test webhookurl');
});

test('render input callbackurl', () => {
    const wrapper = shallow(<BasicDetails
        onBoardingTemplateObject={onBoardingTemplateObject} onClientIdChange={onClientIdChange} onWebhookURLChange={onWebhookURLChange} onCallbackURLChange={onCallbackURLChange} />);
    wrapper.find('input').at(2).simulate('change', 'test callbackurl');
    expect(onCallbackURLChange).toHaveBeenCalledWith('test callbackurl');
});
