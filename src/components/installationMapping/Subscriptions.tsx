import React from 'react';
import { msalConfig } from '../../config/Config';
import { getAllSubscriptions } from '../../services/installationMapping/subscriptionService';
import { Button, SelectMenu } from '@primer/components';
import down from '../../images/downarrow.png';
import * as Constants from "../../Constants";
import '../../css/installationMapping/Mapping.css';
import redcross from '../../images/redcross.png';

export interface ISubscriptionProps {
  getAccessToken: any,
  setError: any,
  tenantId: string,
  setSubscriptionIds: any,
  setAccessToken: any,
  setErrorOnFetchingSubscriptions: any,
  errorOnFetchingSubscriptions: boolean,
  errorOnFetchingTenants: boolean
}

interface SubscriptionParameters {
  subscriptions: any[];
  filteredSubscriptions: any[];
  finalSubscriptionList: any[];
  currentTenantId: string;
  subscriptionRadioButtonValue: string;
  searchValueForSubscriptions: string;
}

interface SubscriptionState {
  subscriptionParameters: SubscriptionParameters;
}

export class Subscription extends React.Component<ISubscriptionProps, SubscriptionState> {
  constructor(props: any) {
    super(props);
    let subscriptionParameters: SubscriptionParameters = {
      subscriptions: [],
      filteredSubscriptions: [],
      finalSubscriptionList: [],
      currentTenantId: '',
      subscriptionRadioButtonValue: Constants.AllSubscriptionsRadioButtonValue,
      searchValueForSubscriptions: ""
    }
    this.state = {
      subscriptionParameters: subscriptionParameters
    };
  }

  setSubscriptionParameters(subscriptionParameters: SubscriptionParameters) {
    this.setState({ subscriptionParameters: subscriptionParameters });
  }

  async componentDidUpdate() {
    try {
      let subscriptionParameters = this.state.subscriptionParameters;
      if (this.props.tenantId !== this.state.subscriptionParameters.currentTenantId) {
        if (this.props.tenantId) {
          var accessToken = await this.props.getAccessToken(this.props.tenantId, msalConfig.azureApiScopes);
          var subscriptions = await getAllSubscriptions(accessToken);
          subscriptionParameters.subscriptions = subscriptions;
          subscriptionParameters.currentTenantId = this.props.tenantId;
          subscriptionParameters.filteredSubscriptions = subscriptions;
        } else {
          subscriptionParameters.subscriptions = [];
          subscriptionParameters.currentTenantId = '';
          subscriptionParameters.filteredSubscriptions = [];
        }
        subscriptionParameters.finalSubscriptionList = [];
        subscriptionParameters.subscriptionRadioButtonValue = Constants.AllSubscriptionsRadioButtonValue;
        subscriptionParameters.searchValueForSubscriptions = "";
        this.props.setSubscriptionIds(subscriptionParameters.subscriptions);
        this.setSubscriptionParameters(subscriptionParameters);
        this.props.setAccessToken(accessToken);
      }
    }
    catch (err) {
      this.props.setErrorOnFetchingSubscriptions(true);
      this.props.setError('ERROR', JSON.stringify(err));
    }
  }

  render() {
    var style = { 'height': '24px', 'padding': '0' };
    let isPresentInFinalList: boolean = false;
    let showSubscriptionFilter: boolean = false;
    if (this.state.subscriptionParameters.filteredSubscriptions.length > 0) {
      showSubscriptionFilter = true;
    }
    let options: any = [];
    this.state.subscriptionParameters.filteredSubscriptions && this.state.subscriptionParameters.filteredSubscriptions.length > 0 &&
      this.state.subscriptionParameters.filteredSubscriptions.map(subs => {
        isPresentInFinalList = false;
        this.state.subscriptionParameters.finalSubscriptionList.map(finalSub => {
          if (subs.displayName === finalSub.displayName) {
            isPresentInFinalList = true;
          }
        });
        options.push(<SelectMenu.Item style={style} key={subs.subscriptionId} className="formitem-selectmenu-item">
          <input id={subs.displayName} className="input-checkbox" type="checkbox" checked={isPresentInFinalList} onClick={(event) => this.onSelectingSubscription(event)} />
          <label htmlFor={subs.displayName} className="input-checkbox-label">{subs.displayName}</label>
        </SelectMenu.Item>);
      });
    let finalList: any = [];
    this.state.subscriptionParameters.finalSubscriptionList.map(subs => {
      finalList.push(
        <div key={subs.subscriptionId} className="subscription-item">
          <span className="subscription-item-name">{subs.displayName}</span>
          <button className="subscription-remove-button" type="button" aria-label="remove-button" onClick={() => {
            this.onRemovalOfSubscription(subs.displayName)
          }}>
            <span className="remove-button">{Constants.RemoveButtonText}</span>
          </button>
        </div>
      );
    });
    let subList = <div className="subs-list">
      {
        finalList
      }
    </div>
    if (this.state.subscriptionParameters.finalSubscriptionList.length > 3) {
      subList = <div className="subs-list overflow">
        {
          finalList
        }
      </div>
    }
    return (
      <div className="formitem-subscription">
        <span>{Constants.SelectAzureSubscriptionLabel}</span>
        <SelectMenu className="formitem-dropdown">
          <Button className="formitem-button" as="summary" style={{ 'border': '1px solid #8A8886', 'borderRadius': '2px', 'backgroundColor': '#fff', 'padding': '0', 'height': '24px' }}>
            <span className="formitem-button-value">{Constants.SelectSubscriptionsPlaceholder}</span>
            <img className="formitem-dropdown-arrow" alt="" src={down} />
          </Button>
          {
            showSubscriptionFilter &&
            <SelectMenu.Modal width="370px">
              <SelectMenu.Filter style={style} onChange={(event: any) => { this.onFilteringSubscription(event.target.value) }} placeholder={Constants.DropdownFilterAriaLabel} value={this.state.subscriptionParameters.searchValueForSubscriptions} aria-label={Constants.DropdownFilterAriaLabel} />
              <SelectMenu.Header style={{ 'height': '24px', 'padding': '0 0 0 10px' }}>{Constants.AllSubscriptionsRadioButtonValue}</SelectMenu.Header>
              <SelectMenu.List className="all-subscriptions-list">
                <SelectMenu.Item style={style} key={Constants.AllSubscriptionsRadioButtonValue} className="formitem-selectmenu-item">
                  <input id="input-checkbox-all" className="input-checkbox" type="checkbox" checked={this.state.subscriptionParameters.subscriptionRadioButtonValue == Constants.AllSubscriptionsRadioButtonValue} onClick={() => this.onAllSubscriptionsCheckBox()} value={Constants.AllSubscriptionsRadioButtonNote} />
                  <label htmlFor="input-checkbox-all" className="input-checkbox-label">{Constants.AllSubscriptionsRadioButtonNote}</label>
                </SelectMenu.Item>
              </SelectMenu.List>
              <SelectMenu.Header style={{ 'height': '24px', 'padding': '8px 0 0 10px' }}>{Constants.SelectSubscriptionsRadioButtonValue}</SelectMenu.Header>
              <SelectMenu.List className="select-subscriptions-list">
                {
                  options
                }
              </SelectMenu.List>
            </SelectMenu.Modal>
          }
          {
            !showSubscriptionFilter &&
            <SelectMenu.Modal width="370px">
              <SelectMenu.Filter onChange={(event: any) => { this.onFilteringSubscription(event.target.value) }} placeholder={Constants.DropdownFilterAriaLabel} value={this.state.subscriptionParameters.searchValueForSubscriptions} aria-label={Constants.DropdownFilterAriaLabel} />
              <SelectMenu.List>
              </SelectMenu.List>
            </SelectMenu.Modal>
          }
        </SelectMenu>
        {
          this.props.errorOnFetchingSubscriptions &&
          <div className="errMessage">
            <img className="err-img" src={redcross} width="20px" height="20px" />
            <span className="err-msg">{Constants.ErrorOnFetchingSubscriptionsMessage}</span>
          </div>
        }
        <div className="subscription-link">
          <a className="link" href={Constants.CreateSubscriptionLink} rel="noopener noreferrer" target="_blank"> {Constants.CreateSubscription}</a>
        </div>
        {
          this.state.subscriptionParameters.finalSubscriptionList && this.state.subscriptionParameters.finalSubscriptionList.length > 0 &&
          <div className="selected-subscriptions-list">
            <span className="heading-subscriptions-selected">Selected {this.state.subscriptionParameters.finalSubscriptionList.length} subscriptions</span>
            {
              subList
            }
          </div>
        }
      </div >
    )
  }
  filterSubscriptions(searchValue: string, subscriptionParameters: SubscriptionParameters): SubscriptionParameters {
    let filteredSubs: any[] = [];
    subscriptionParameters.subscriptions.filter(sub => {
      if (sub.displayName.toString().toLowerCase().indexOf(searchValue.toString().toLowerCase()) !== -1)
        filteredSubs.push(sub);
    });
    subscriptionParameters.filteredSubscriptions = filteredSubs;
    subscriptionParameters.searchValueForSubscriptions = searchValue;
    return subscriptionParameters;
  }

  onFilteringSubscription(searchValue: string) {
    let subscriptionParameters = this.filterSubscriptions(searchValue, this.state.subscriptionParameters);
    this.setSubscriptionParameters(subscriptionParameters);
  }

  onSelectingSubscription(event: any | React.MouseEvent<HTMLInputElement, MouseEvent>) {
    let subscriptionParameters = this.state.subscriptionParameters;
    let subs = subscriptionParameters.finalSubscriptionList;
    let tobeAddedSubscription = subscriptionParameters.filteredSubscriptions.filter(sub => {
      return (sub.displayName.indexOf(event.currentTarget.id) !== -1);
    });
    if (!event.target.checked) {
      this.onRemovalOfSubscription(event.currentTarget.id);
    }
    else {
      subs[subscriptionParameters.finalSubscriptionList.length] = tobeAddedSubscription[0];
      subscriptionParameters.finalSubscriptionList = subs.sort(this.sortFinalSubscriptionsList());
      subscriptionParameters.subscriptionRadioButtonValue = Constants.SelectSubscriptionsRadioButtonValue;
      this.props.setSubscriptionIds(subscriptionParameters.finalSubscriptionList);
      this.setSubscriptionParameters(subscriptionParameters);
    }
  }

  onAllSubscriptionsCheckBox() {
    let subscriptionParameters = this.state.subscriptionParameters;
    if (subscriptionParameters.subscriptionRadioButtonValue == Constants.AllSubscriptionsRadioButtonValue) {
      subscriptionParameters.subscriptionRadioButtonValue = Constants.SelectSubscriptionsRadioButtonValue;
      this.props.setSubscriptionIds([]);
    }
    else {
      subscriptionParameters.subscriptionRadioButtonValue = Constants.AllSubscriptionsRadioButtonValue;
      subscriptionParameters.finalSubscriptionList = [];
      this.props.setSubscriptionIds(subscriptionParameters.subscriptions);
    }
    this.setSubscriptionParameters(subscriptionParameters);
  }

  onRemovalOfSubscription(subscriptionDisplayName: string) {
    let subscriptionParameters = this.state.subscriptionParameters;
    let subs = subscriptionParameters.finalSubscriptionList;
    let indexToBeDeleted = -1;
    subs.map((subs, index) => {
      if (subs.displayName === subscriptionDisplayName) {
        indexToBeDeleted = index;
      }
    });
    if (indexToBeDeleted !== -1) {
      subs.splice(indexToBeDeleted, 1);
      subscriptionParameters.finalSubscriptionList = subs.sort(this.sortFinalSubscriptionsList());
      this.props.setSubscriptionIds(subscriptionParameters.finalSubscriptionList);
      if (subscriptionParameters.finalSubscriptionList.length == 0) {
        subscriptionParameters.subscriptionRadioButtonValue = Constants.AllSubscriptionsRadioButtonValue;
        this.props.setSubscriptionIds(subscriptionParameters.subscriptions);
      }
      this.setSubscriptionParameters(subscriptionParameters);
    }
  }

  sortFinalSubscriptionsList() {
    return function (a: any, b: any) {
      if (a && a.displayName && b && b.displayName) {
        if (a.displayName.toLowerCase() > b.displayName.toLowerCase()) {
          return 1;
        } else if (a.displayName.toLowerCase() < b.displayName.toLowerCase()) {
          return -1;
        }
      }
      return 0;
    }
  }
}

export default Subscription;