import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from "enzyme";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Subscriptions, { ISubscriptionProps } from "../../components/installationMapping/Subscriptions";
import { getSubscriptions, ISubscription } from '../../services/installationMapping/subscriptionService';
import { basicURLS } from "../../config/Config";

Enzyme.configure({ adapter: new Adapter() });

const subscriptionProps: ISubscriptionProps = {
    getAccessToken: jest.fn(),
    setAccessToken: jest.fn(),
    setError: jest.fn(),
    setSubscriptionIds: jest.fn(),
    tenantId: "tenant"
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

