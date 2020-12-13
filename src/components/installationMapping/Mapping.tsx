import * as React from 'react';
import withAuthProvider from '../../provider/AuthProviderForInstallationMapping';
import '../../css/installationMapping/Mapping.css';
import ClipLoader from "react-spinners/ClipLoader";
import Tenants, { ITenantsProps } from './Tenants';
import { IMappingInput, saveMapping } from "../../services/installationMapping/mappingService";
import azurelogo from '../../images/azurelogo.png';
import * as Constants from '../../Constants';
import Subscriptions, { ISubscriptionProps } from './Subscriptions';
import { msalConfig, basicURLS } from '../../config/Config';
import { getTenants } from '../../services/installationMapping/tenantService';
import successRest from '../../images/successRest.png';
import redcross from '../../images/redcross.png';

export interface MappingStateObject {
    successMessage: string,
    error: boolean,
    errorMessage: string,
    loading: boolean,
    installationId: string,
    ghstate: string,
    subscriptionIds: string[],
    selectedTenant: {
        id: string,
        name: string
    },
    tenants: {
        value: any[]
    },
    errorOnFetchingTenants: boolean,
    errorOnFetchingSubscriptions: boolean,
    accessToken: string
}

interface MappingState {
    mappingStateObject: MappingStateObject
}

class Mapping extends React.Component<any, MappingState> {
    constructor(props: any) {
        super(props);
        let mappingStateObject: MappingStateObject = {
            successMessage: "",
            error: false,
            errorMessage: "",
            loading: false,
            installationId: this.getQueryParam("installation_id"),
            ghstate: this.getQueryParam("state"),
            subscriptionIds: [],
            selectedTenant: {
                id: "",
                name: ""
            },
            tenants: {
                value: []
            },
            errorOnFetchingTenants: false,
            errorOnFetchingSubscriptions: false,
            accessToken: ""
        }
        this.state = {
            mappingStateObject: mappingStateObject
        };
    }

    private getQueryParam(paramName: string) {
        let param = "";
        let url: URL = new URL(window.location.href);
        const queryString = new URLSearchParams(url.search);
        if (queryString.has(paramName)) {
            param = queryString.get(paramName) || param;
        }

        return param;
    }

    async componentDidMount() {
        try {
            let accessToken = await this.props.getAccessToken('', msalConfig.azureScopes);
            let tenants = await getTenants(accessToken);
            this.setTenants(tenants);
        }
        catch (err) {
            var mappingStateObject = this.state.mappingStateObject;
            mappingStateObject.errorOnFetchingTenants = true;
            this.props.setError('ERROR', JSON.stringify(err));
        }
    }

    setMappingState = (mappingStateObject: MappingStateObject) => {
        this.setState({ mappingStateObject: mappingStateObject });
    }

    private setAccessToken(accessToken: string) {
        let mappingStateObject = this.state.mappingStateObject;
        mappingStateObject.accessToken = accessToken;
        this.setMappingState(mappingStateObject);
    }

    private setLoading(loading: boolean) {
        let mappingStateObject = this.state.mappingStateObject;
        mappingStateObject.loading = loading;
        this.setMappingState(mappingStateObject);
    }

    private setInstallationSuccess() {
        let mappingStateObject = this.state.mappingStateObject;
        mappingStateObject.successMessage = Constants.InstallationMappingSuccessfullMessage;
        mappingStateObject.loading = false;
        this.setMappingState(mappingStateObject);
    }

    private setInstallationError(error: any) {
        let mappingStateObject = this.state.mappingStateObject;
        if (error instanceof Error) {
            mappingStateObject.errorMessage = error.message;
        }
        mappingStateObject.error = true;
        mappingStateObject.loading = false;
        this.setMappingState(mappingStateObject);
    }

    private setTenants(tenants: any) {
        let mappingStateObject = this.state.mappingStateObject;
        mappingStateObject.tenants = tenants;
        this.setMappingState(mappingStateObject);
    }

    private setSelectedTenant(tenant: any) {
        let mappingStateObject = this.state.mappingStateObject;
        mappingStateObject.selectedTenant = {
            id: tenant.tenantId,
            name: tenant.displayName
        };
        this.setMappingState(mappingStateObject);
    }

    private setSubscriptionIds(subscriptionsIds: any) {
        let mappingStateObject = this.state.mappingStateObject;
        mappingStateObject.subscriptionIds = subscriptionsIds;
        this.setMappingState(mappingStateObject);
    }

    private setErrorOnFetchingSubscriptions(res: boolean) {
        let mappingStateObject = this.state.mappingStateObject;
        mappingStateObject.errorOnFetchingSubscriptions = res;
        this.setMappingState(mappingStateObject);
    }

    private saveInstallationMapping() {
        this.setLoading(true);
        let mappingInput: IMappingInput = {
            installationId: this.state.mappingStateObject.installationId,
            tenantId: this.state.mappingStateObject.selectedTenant.id,
            subscriptionIds: this.state.mappingStateObject.subscriptionIds
        };
        saveMapping(mappingInput, this.state.mappingStateObject.accessToken).then(result => {
            this.setInstallationSuccess();

            if (this.state.mappingStateObject.ghstate !== "") {
                this.redirectToUserAuth(this.state.mappingStateObject.ghstate);
            }
        }).catch(ex => {
            this.setInstallationError(ex);
        });
    }

    private redirectToUserAuth(ghstate: string) {
        window.location.href = basicURLS.gitHubUserAuthURL + ghstate;
    }

    render() {
        let tenantProps: ITenantsProps = {
            mappingStateObject: this.state.mappingStateObject,
            setTenantId: this.setSelectedTenant.bind(this)
        }

        let subscriptionProps: ISubscriptionProps = {
            getAccessToken: this.props.getAccessToken,
            setError: this.props.setError,
            tenantId: this.state.mappingStateObject.selectedTenant.id,
            setSubscriptionIds: this.setSubscriptionIds.bind(this),
            setAccessToken: this.setAccessToken.bind(this),
            setErrorOnFetchingSubscriptions: this.setErrorOnFetchingSubscriptions.bind(this),
            errorOnFetchingSubscriptions: this.state.mappingStateObject.errorOnFetchingSubscriptions,
            errorOnFetchingTenants: this.state.mappingStateObject.errorOnFetchingTenants
        };
        return (
            <div className="full-size">
                    <div className="outer">
                        <div className="inner">
                            <div className="heading-container">
                                <img className="heading-image" src={azurelogo} />
                                <span className="heading-text">{Constants.MicrosoftAzureHeading}</span>
                            </div>
                            <div className="heading-app-text">
                                {Constants.GithubAppHeading}
                            </div>
                            {
                                this.state.mappingStateObject.successMessage != "" &&
                                <div className="successMessage">
                                    <img className="success-img" src={successRest} width="20px" height="20px" />
                                    <span className="success-msg">{this.state.mappingStateObject.successMessage}</span>
                                </div>
                            }
                            {
                                this.state.mappingStateObject.error && this.state.mappingStateObject.errorMessage != "" &&
                                <div className="errorMessage">
                                    <img className="error-img" src={redcross} width="20px" height="20px" />
                                    <span className="error-msg">{Constants.InstallationMappingErrorMessage + " Error: " + this.state.mappingStateObject.errorMessage}</span>
                                </div>
                            }
                            {
                                this.state.mappingStateObject.error && this.state.mappingStateObject.errorMessage == "" &&
                                <div className="errorMessage">
                                    <img className="error-img" src={redcross} width="20px" height="20px" />
                                    <span className="error-msg">{Constants.InstallationMappingErrorMessage}</span>
                                </div>
                            }
                            <form
                                className="form-items"
                                onSubmit={(ev) => {
                                    ev.preventDefault();
                                    this.saveInstallationMapping();
                                }}
                            >
                                <Tenants {...tenantProps} />
                                <Subscriptions {...subscriptionProps}></Subscriptions>
                                <div className="description-link">
                                    {Constants.GithubAppDescription1}
                                    <a className="link" href={Constants.TermsOfServiceLink} rel="noopener noreferrer" target="_blank"> {Constants.TermsOfService}</a>, <a className="link bolt-link" href={Constants.PrivacyStatementLink} rel="noopener noreferrer" target="_blank">{Constants.PrivacyStatement}</a> and <a className="link bolt-link" href={Constants.CodeOfConductLink} rel="noopener noreferrer" target="_blank">
                                        {Constants.CodeOfConduct}
                                    </a>.
                                </div>
                            </form>
                            {
                                this.state.mappingStateObject.loading ?
                                    <ClipLoader
                                        css={
                                            `display: block; float: right; margin-bottom: 30px; margin-right: 49px;`
                                        }
                                        size={40}
                                        loading={this.state.mappingStateObject.loading}
                                    ></ClipLoader> :
                                    <div className="save-button text-right">
                                        <button aria-disabled="false" className="bolt-button" data-focuszone="" data-is-focusable="true" type="submit" onClick={(ev) => {
                                            ev.preventDefault();
                                            this.saveInstallationMapping();
                                        }}>
                                            <span className="bolt-button-text">{Constants.SaveButtonText}</span>
                                        </button>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
        )
    }
}

export default withAuthProvider(Mapping);