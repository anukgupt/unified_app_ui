// import { enableFetchMocks } from 'jest-fetch-mock';
// enableFetchMocks();
import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Tenants, { ITenantsProps } from "../../components/installationMapping/Tenants";
import { MappingStateObject } from '../../components/installationMapping/Mapping';
import { getTenants } from "../../services/installationMapping/tenantService";

Enzyme.configure({ adapter: new Adapter() });

let mappingStateObject: MappingStateObject = {
    accessToken: "asds",
    error: "error",
    installationId: "123",
    loading: false,
    selectedTenant: {
        id: "12",
        name: "name"
    },
    subscriptionIds: [],
    success: "",
    tenants: {
        value: []
    }
}
let tenantProps: ITenantsProps = {
    mappingStateObject: mappingStateObject,
    setTenantId: jest.fn()
}
test('renders tenants', () => {
    const tenantsUI = renderer.create(<Tenants {...tenantProps} />).toJSON();
    expect(tenantsUI).toMatchSnapshot()
});