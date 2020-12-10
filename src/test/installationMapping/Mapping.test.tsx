import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Mapping from "../../components/installationMapping/Mapping";
import { fireEvent, render, waitForElement } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import { getTenants } from "../../services/installationMapping/tenantService";

Enzyme.configure({ adapter: new Adapter() });

test('renders default ui', () => {
    const mappingUI = renderer.create(<Mapping />).toJSON();
    expect(mappingUI).toMatchSnapshot()
});

test('getTenants should fetch tenants', async () => {
    var response = { value: ["default_1", "default_2"] };
    const mockFetchPromise = Promise.resolve({
        json: () => Promise.resolve({ tenants: response }),
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    const tenants = await getTenants("");
    console.log(tenants);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith("https://management.azure.com/tenants?api-version=2020-01-01", { "headers": { "Authorization": "Bearer " }, "method": "GET" });
    expect(tenants).toBeDefined();
    expect(tenants).toStrictEqual({ tenants: response });
});

test('Verify if Save Button is in the document', async () => {
    // Render the App
    const { getByText } = render(<Mapping />);
    var saveTemplateMapping = (ev: any) => jest.fn();
    const button = getByText('Save');
    expect(button).toBeInTheDocument();
});


