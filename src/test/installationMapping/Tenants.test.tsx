// import { enableFetchMocks } from 'jest-fetch-mock';
// enableFetchMocks();
import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Tenants, { ITenantsProps } from "../../components/installationMapping/Tenants";
import { MappingStateObject } from '../../components/installationMapping/Mapping';
import { mount } from "enzyme";

Enzyme.configure({ adapter: new Adapter() });

let mappingStateObject: MappingStateObject = {
    successMessage: "",
    error: false,
    errorMessage: "",
    loading: false,
    installationId: "123",
    ghstate: "state",
    subscriptionIds: [],
    selectedTenant: {
        id: "12",
        name: "name"
    },
    tenants: {
        value: []
    },
    errorOnFetchingTenants: false,
    errorOnFetchingSubscriptions: false,
    accessToken: ""
}
let tenantProps: ITenantsProps = {
    mappingStateObject: mappingStateObject,
    setTenantId: jest.fn()
}

test('renders tenants', () => {
    const tenantsUI = renderer.create(<Tenants {...tenantProps} />).toJSON();
    expect(tenantsUI).toMatchSnapshot()
});

test('test selectmenu', () => {
    const tenantsUI = mount(<Tenants {...tenantProps} />);
    expect(tenantsUI.find('.formitem-dropdown').exists()).toBeTruthy();
});

test('test selectmenu button', () => {
    const tenantsUI = mount(<Tenants {...tenantProps} />);
    expect(tenantsUI.find('.formitem-button').exists()).toBeTruthy();
});

test('test selectmenu items', () => {
    tenantProps.mappingStateObject.tenants = { value: ["def1", "def2"] };
    const tenantsUI = mount(<Tenants {...tenantProps} />);
    const selectMenuItem = tenantsUI.find('.formitem-selectmenu-item').at(0);
    expect(selectMenuItem.exists()).toBeTruthy();
    selectMenuItem.simulate('click');
    expect(tenantProps.setTenantId).toHaveBeenCalled();
});
