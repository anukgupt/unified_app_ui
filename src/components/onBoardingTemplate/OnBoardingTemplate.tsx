import * as React from 'react';
import '../../css/onBoarding/Template.css';
import * as Constants from "../../Constants";
import withAuthProvider from "../../provider/AuthProviderForOnBoarding";
import BasicDetails from './BasicDetails';
import RepoPermissions from './RepoPermissions';
import OrgPermissions from './OrgPermissions';
import UserPermissions from './UserPermissions';
import { saveTemplateMapping } from '../../services/onBoardingTemplate/TemplateMappingService';
import one from "../../images/one.png";
import two from "../../images/two.png";
import three from "../../images/three.png";
import four from "../../images/four.png";
import error from "../../images/error.png";
import successRest from "../../images/successRest.png";
import lessthan from "../../images/lessthan.png";
import greaterthan from "../../images/greaterthan.png";
import { Tabs, TabPanel, Tab, TabList } from 'react-tabs';

export interface onBoardingObject {
    clientId: string;
    clientIdError: boolean;
    webhookURL: string;
    webhookURLError: boolean;
    callbackURL: string;
    callbackURLError: boolean;
    repoPermissions: { [key: string]: string };
    orgPermissions: { [key: string]: string };
    userPermissions: { [key: string]: string };
    showOnBoardingTemplate: boolean;
    isUserAuthorized: boolean;
    isTemplateSucessfullySaved: boolean;
    selectedTabIndex: number;
    isUserAdminFlowInProcess: boolean;
}
interface ITemplateState {
    onBoardingTemplateObject: onBoardingObject
}

class OnBoardingTemplate extends React.Component<any, ITemplateState> {
    private accessToken: string = '';
    constructor(props: any) {
        super(props);
        let onBoardingTemplateObject: onBoardingObject = {
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
        };
        this.state = {
            onBoardingTemplateObject: onBoardingTemplateObject
        };
        this.initialize();
    }

    async initialize() {
        let onBoardingTemplateObject = this.state.onBoardingTemplateObject;
        try {
            this.accessToken = await this.props.login('');
            onBoardingTemplateObject.isUserAuthorized = this.props.isAuthenticated;
            onBoardingTemplateObject.isUserAdminFlowInProcess = false;
            this.setTemplateState(onBoardingTemplateObject);
        }
        catch (error) {
            onBoardingTemplateObject.isUserAdminFlowInProcess = false;
            console.log(error);
        }
    }

    render(): React.ReactNode {
        let buttonClassName = "buttons"
        if (this.state.onBoardingTemplateObject.isUserAuthorized && this.state.onBoardingTemplateObject.selectedTabIndex == -1) {
            buttonClassName = "buttons buttons-position";
        }
        let oneIcon = one, twoIcon = two, threeIcon = three, fourIcon = four;
        if (this.state.onBoardingTemplateObject.isUserAuthorized && this.state.onBoardingTemplateObject.isTemplateSucessfullySaved) {
            oneIcon = twoIcon = threeIcon = fourIcon = successRest;
        }
        let tabs: any[] = [];
        tabs[0] = tabs[1] = tabs[2] = tabs[3] = "tab";
        tabs[this.state.onBoardingTemplateObject.selectedTabIndex] = "tab underline";
        return (
            !this.state.onBoardingTemplateObject.isUserAdminFlowInProcess &&
            <div className="main">
                {
                    <div className="container-1">
                        <div className="onboarding-template">
                            <div className="onboarding-heading">
                                <div className="onboarding-heading-text">{Constants.OnBoardingHeading}</div>
                                <div className="onboarding-heading-create">{Constants.CreateHeading}</div>
                            </div>
                            {
                                this.state.onBoardingTemplateObject.isUserAuthorized &&
                                <form className="onboarding-form" id="onboarding-template" action="">
                                    <Tabs selectedIndex={this.state.onBoardingTemplateObject.selectedTabIndex} onSelect={() => { }}>
                                        <TabList className="tab-list">
                                            <Tab className={tabs[0]} href="" aria-label={Constants.ConfigurationHeading} onClick={() => this.onSelectingTab(0)}>
                                                <img className="tab-image" alt="" src={oneIcon} />
                                                <span className="tab-text">{Constants.ConfigurationHeading}</span>
                                            </Tab>
                                            <Tab className={tabs[1]} href="" aria-label={Constants.RepoPermissionsHeading} onClick={() => this.onSelectingTab(1)}>
                                                <img className="tab-image" alt="" src={twoIcon} />
                                                <span> {Constants.RepoPermissionsHeading}</span>
                                            </Tab>
                                            <Tab className={tabs[2]} href="" aria-label={Constants.OrgPermissionsHeading} onClick={() => this.onSelectingTab(2)}>
                                                <img className="tab-image" alt="" src={threeIcon} />
                                                <span> {Constants.OrgPermissionsHeading}</span>
                                            </Tab>
                                            <Tab className={tabs[3]} href="" aria-label={Constants.UserPermissionsHeading} onClick={() => this.onSelectingTab(3)}>
                                                <img className="tab-image" alt="" src={fourIcon} />
                                                <span> {Constants.UserPermissionsHeading}</span>
                                            </Tab>
                                        </TabList>
                                        <TabPanel><BasicDetails onBoardingTemplateObject={this.state.onBoardingTemplateObject} onClientIdChange={this.onClientIdChange} onWebhookURLChange={this.onWebhookURLChange} onCallbackURLChange={this.onCallbackURLChange} /></TabPanel>
                                        <TabPanel><RepoPermissions setTemplateState={this.setTemplateState} onBoardingTemplateObject={this.state.onBoardingTemplateObject} /></TabPanel>
                                        <TabPanel><OrgPermissions setTemplateState={this.setTemplateState} onBoardingTemplateObject={this.state.onBoardingTemplateObject} /></TabPanel>
                                        <TabPanel><UserPermissions setTemplateState={this.setTemplateState} onBoardingTemplateObject={this.state.onBoardingTemplateObject} /></TabPanel>
                                    </Tabs>
                                    {
                                        this.state.onBoardingTemplateObject.isUserAuthorized && this.state.onBoardingTemplateObject.isTemplateSucessfullySaved && this.state.onBoardingTemplateObject.selectedTabIndex == -1 &&
                                        < div className="template-saved">
                                            <img className="template-saved-image" alt="" src={successRest} />
                                            <div className="template-saved-message">
                                                <span>{Constants.TemplateSuccessfullySavedMessage}</span>
                                                <span><a className="template-saved-link" href={Constants.TemplateSuccessfullySavedLink}>{Constants.TemplateSuccessfullySavedLinkText}</a></span>
                                                <span>.</span>
                                            </div>
                                        </div>
                                    }
                                    {
                                        this.state.onBoardingTemplateObject.isUserAuthorized && !this.state.onBoardingTemplateObject.isTemplateSucessfullySaved && this.state.onBoardingTemplateObject.selectedTabIndex == -1 &&
                                        < div className="template-not-saved">
                                            <img className="template-not-saved-image" alt="" src={error} />
                                            <div className="template-not-saved-message">
                                                <span>{Constants.TemplateNotSavedMessage}</span>
                                            </div>
                                        </div>
                                    }
                                    <div className={buttonClassName}>
                                        <button type="button" className="create-configuration" aria-label={Constants.CreateOnboardingTemplateButton} onClick={this.submitTemplate}>
                                            <span className="create-configuration-text">{Constants.CreateOnboardingTemplateButton}</span>
                                        </button>
                                        <button type="button" className="previous-button" aria-label={Constants.PreviousButton} onClick={this.onPreviousButtonClick}>
                                            <img className="button-image-prev" alt="" src={lessthan} />
                                            <span>{Constants.PreviousButton}</span>
                                        </button>
                                        <button type="button" className="next-button" aria-label={Constants.NextButton} onClick={this.onNextButtonClick}>
                                            <span>{Constants.NextButton}</span>
                                            <img className="button-image-next" alt="" src={greaterthan} />
                                        </button>
                                    </div>
                                </form>
                            }
                            {
                                !this.state.onBoardingTemplateObject.isUserAuthorized &&
                                < div className="user-not-authorized">
                                    <img className="user-not-authorized-image" alt="" src={error} />
                                    <div className="user-not-authorized-message">
                                        <span>{Constants.UserNotAuthorizedMessage}</span>
                                        <span><a className="user-not-authorized-link" href={Constants.UserNotAuthorizedLink}>{Constants.UserNotAuthorizedLinkText}</a></span>
                                        <span>.</span>
                                    </div>
                                </div>
                            }
                        </div>
                    </div >
                }
            </div >
        )
    }

    setTemplateState = (onBoardingTemplateObject: onBoardingObject) => {
        this.setState({ onBoardingTemplateObject: onBoardingTemplateObject });
    }

    onClientIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let onBoardingTemplateObject = this.state.onBoardingTemplateObject;
        onBoardingTemplateObject.clientId = event.target.value;
        this.setTemplateState(onBoardingTemplateObject);
    }

    onWebhookURLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let onBoardingTemplateObject = this.state.onBoardingTemplateObject;
        onBoardingTemplateObject.webhookURL = event.target.value;
        this.setTemplateState(onBoardingTemplateObject);
    }

    onCallbackURLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let onBoardingTemplateObject = this.state.onBoardingTemplateObject;
        onBoardingTemplateObject.callbackURL = event.target.value;
        this.setTemplateState(onBoardingTemplateObject);
    }

    onRepPermissionsChange = (id: string, value: string) => {
        let onBoardingTemplateObject = this.state.onBoardingTemplateObject;
        onBoardingTemplateObject.repoPermissions[id] = value;
        this.setTemplateState(onBoardingTemplateObject);
    }

    onOrgPermissionsChange = (id: string, value: string) => {
        let onBoardingTemplateObject = this.state.onBoardingTemplateObject;
        onBoardingTemplateObject.orgPermissions[id] = value;
        this.setTemplateState(onBoardingTemplateObject);
    }

    onUserPermissionsChange = (id: string, value: string) => {
        let onBoardingTemplateObject = this.state.onBoardingTemplateObject;
        onBoardingTemplateObject.userPermissions[id] = value;
        this.setTemplateState(onBoardingTemplateObject);
    }

    validationsOnTemplateSubmission(): onBoardingObject {
        let onBoardingTemplateObject = this.state.onBoardingTemplateObject;
        if (this.state.onBoardingTemplateObject.clientId.length === 0) {
            onBoardingTemplateObject.clientIdError = true;
        }
        else
            onBoardingTemplateObject.clientIdError = false;
        return onBoardingTemplateObject;
    }

    submitTemplate = () => {
        var onBoardingTemplateObject = this.validationsOnTemplateSubmission();
        if (onBoardingTemplateObject.clientIdError) {
            this.setTemplateState(onBoardingTemplateObject);
            document.getElementById("clientId")?.focus();
        }
        else
            try {
                saveTemplateMapping(this.state.onBoardingTemplateObject, this.accessToken);
                onBoardingTemplateObject.showOnBoardingTemplate = false;
                onBoardingTemplateObject.isTemplateSucessfullySaved = true;
                onBoardingTemplateObject.selectedTabIndex = -1;
                this.setTemplateState(onBoardingTemplateObject);
            }
            catch (error) {
                onBoardingTemplateObject.isTemplateSucessfullySaved = false;
                onBoardingTemplateObject.showOnBoardingTemplate = false;
                onBoardingTemplateObject.selectedTabIndex = -1;
                this.setTemplateState(onBoardingTemplateObject);
            }
    }

    onNextButtonClick = () => {
        var onBoardingTemplateObject = this.state.onBoardingTemplateObject;
        onBoardingTemplateObject.selectedTabIndex = onBoardingTemplateObject.selectedTabIndex + 1;
        if (onBoardingTemplateObject.selectedTabIndex > 3) {
            onBoardingTemplateObject.selectedTabIndex = 3;
        }
        this.setTemplateState(onBoardingTemplateObject);
    }

    onPreviousButtonClick = () => {
        var onBoardingTemplateObject = this.state.onBoardingTemplateObject;
        onBoardingTemplateObject.selectedTabIndex = onBoardingTemplateObject.selectedTabIndex - 1;
        if (onBoardingTemplateObject.selectedTabIndex < 0) {
            onBoardingTemplateObject.selectedTabIndex = 0;
        }
        this.setTemplateState(onBoardingTemplateObject);
    }

    onSelectingTab(index: number) {
        var onBoardingTemplateObject = this.state.onBoardingTemplateObject;
        onBoardingTemplateObject.selectedTabIndex = index;
        this.setTemplateState(onBoardingTemplateObject);
    }
}

export default withAuthProvider(OnBoardingTemplate);