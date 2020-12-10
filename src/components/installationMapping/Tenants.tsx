import React from 'react';
import { SelectMenu, Button } from '@primer/components';
import down from '../../images/downarrow.png';
import * as Constants from "../../Constants";
import { MappingStateObject } from './Mapping';
import '../../css/installationMapping/Mapping.css';
import redcross from '../../images/redcross.png';

export interface ITenantsProps {
  mappingStateObject: MappingStateObject,
  setTenantId: any
}

class Tenants extends React.Component<ITenantsProps> {
  render() {
    let tenants = this.props.mappingStateObject.tenants;
    var options = tenants && tenants.value &&
      tenants.value.length > 0 &&
      tenants.value.map(tenant =>
        <SelectMenu.Item className="formitem-selectmenu-item" onClick={() => {
          this.props.setTenantId(tenant);
        }} key={tenant.tenantId}>
          {tenant.displayName}
        </SelectMenu.Item>
      )
    return (
      <div className="formitem-tenant">
        <span>{Constants.SelectAzureTenantLabel}</span>
        <SelectMenu className="formitem-dropdown">
          <Button as="summary" className="formitem-button">
            <span className="formitem-button-value">{this.props.mappingStateObject.selectedTenant.name}</span>
            <img className="formitem-dropdown-arrow" alt="" src={down} />
          </Button>
          <SelectMenu.Modal width="370px">
            <SelectMenu.List>
              {options}
            </SelectMenu.List>
          </SelectMenu.Modal>
        </SelectMenu>
        {
          this.props.mappingStateObject.errorOnFetchingTenants &&
          <div className="errMessage">
            <img className="err-img" src={redcross} width="20px" height="20px" />
            <span className="err-msg">{Constants.ErrorOnFetchingTenantsMessage}</span>
          </div>
        }
      </div>
    );
  }
}

export default Tenants;