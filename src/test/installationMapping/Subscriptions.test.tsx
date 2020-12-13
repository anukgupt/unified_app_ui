import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from "enzyme";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Subscriptions, { ISubscriptionProps } from "../../components/installationMapping/Subscriptions";
import { getSubscriptions } from '../../services/installationMapping/subscriptionService';
import { basicURLS } from "../../config/Config";

Enzyme.configure({ adapter: new Adapter() });

const subscriptionProps: ISubscriptionProps = {
    getAccessToken: jest.fn(),
    setError: jest.fn(),
    tenantId: "tenant",
    setSubscriptionIds: jest.fn(),
    setAccessToken: jest.fn(),
    setErrorOnFetchingSubscriptions: jest.fn(),
    errorOnFetchingSubscriptions: false,
    errorOnFetchingTenants: false
}

test('renders subscriptions', () => {
    const subscriptionsUI = renderer.create(<Subscriptions {...subscriptionProps} />).toJSON();
    expect(subscriptionsUI).toMatchSnapshot()
});

test('getSubscriptions should fetch subscriptions', async () => {
    var subscriptions: any[] = ["default_1", "default_2"];
    const mockFetchPromise = Promise.resolve({
        json: () => Promise.resolve(subscriptions),
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    const subscriptionList = await getSubscriptions(basicURLS.fetchSubscriptionsURL, "");
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith("https://management.azure.com/subscriptions?api-version=2020-01-01", { "headers": { "Authorization": "Bearer " }, "method": "GET" });
    expect(subscriptionList).toBeDefined();
    expect(subscriptionList).toStrictEqual(subscriptions);
});

test('test selectmenu', () => {
    const subscriptionsUI = mount(<Subscriptions {...subscriptionProps} />);
    expect(subscriptionsUI.find('.formitem-dropdown').exists()).toBeTruthy();
});

test('test selectmenu button', () => {
    const subscriptionsUI = mount(<Subscriptions {...subscriptionProps} />);
    expect(subscriptionsUI.find('.formitem-button').exists()).toBeTruthy();
});

test('test all subscriptions and a specific subscrption selectmenu item', () => {
    var subscriptions = [{ "subscriptionId": "subs1", "displayName": "subs1" }, { "subscriptionId": "subs2", "displayName": "subs2" }];
    const subscriptionsUI = mount(<Subscriptions {...subscriptionProps} />);
    subscriptionsUI.setState({ "subscriptionParameters": { "currentTenantId": "tenant", "filteredSubscriptions": subscriptions, "finalSubscriptionList": [], "searchValueForSubscriptions": "", "subscriptionRadioButtonValue": "All Subscriptions", "subscriptions": subscriptions } });
    expect(subscriptionsUI.find('#input-checkbox-all').exists).toBeTruthy();
    subscriptionsUI.find('#input-checkbox-all').simulate('click');
    expect(subscriptionsUI.state()).toStrictEqual({ "subscriptionParameters": { "currentTenantId": "tenant", "filteredSubscriptions": subscriptions, "finalSubscriptionList": [], "searchValueForSubscriptions": "", "subscriptionRadioButtonValue": "Select Subscriptions", "subscriptions": subscriptions } });
    expect(subscriptionsUI.find('#subs1').length).toBe(1);
});

