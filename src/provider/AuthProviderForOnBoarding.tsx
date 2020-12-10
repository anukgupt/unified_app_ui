import React from 'react';
import { UserAgentApplication } from 'msal';
import { msalConfig, basicURLS } from "../config/Config";
import { getUserDetails } from './GraphService';
import * as Constants from "../Constants";

interface AuthProviderState {
    error: any;
    isAuthenticated: boolean;
    user: any;
    currentAuthority: string;
}

export default function withAuthProvider<T extends React.Component<any>>
    (WrappedComponent: new (props: any, context?: any) => T): React.ComponentClass {
    return class extends React.Component<any, AuthProviderState> {
        private userAgentApplication: UserAgentApplication;

        constructor(props: any) {
            super(props);
            this.state = {
                error: null,
                isAuthenticated: false,
                user: {},
                currentAuthority: ""
            };
            this.userAgentApplication = new UserAgentApplication({
                auth: {
                    clientId: msalConfig.appId,
                    redirectUri: msalConfig.redirectUri
                },
                cache: {
                    cacheLocation: "sessionStorage",
                    storeAuthStateInCookie: true
                }
            });
        }

        render(): React.ReactNode {
            return <WrappedComponent
                login={() => this.login()}
                logout={() => this.logout()}
                getAccessToken={(authority: any, scopes: string[]) => this.getAccessToken(authority, scopes)}
                {...this.props} {...this.state}
            />;
        }

        async login(authority: any = undefined): Promise<string> {
            let userRequest = {
                scopes: msalConfig.scopes,
                authority: ""
            }
            if (authority) {
                userRequest.authority = authority;
            }
            try {
                let data = await this.userAgentApplication.loginPopup(userRequest);
                this.setState({
                    currentAuthority: data.tenantId
                });
                //get access token
                var accessToken = await this.getAccessToken('', msalConfig.scopes);
                var result = await this.fetchUserAdmins(accessToken);
                await this.getUserProfile(accessToken);
                this.isUserAdmin(result);
                return accessToken;
            }
            catch (err) {
                console.log(err);
                this.setState({
                    isAuthenticated: false,
                    user: {},
                    error: this.normalizeError(err)
                });
                return '';
            }
        }

        async getUserProfile(accessToken: string) {
            try {
                if (accessToken) {
                    // Get the user's profile from Graph
                    var user = await getUserDetails(accessToken);
                    this.setState({
                        user: {
                            displayName: user.displayName,
                            uid: user.id
                        }
                    });
                }
            }
            catch (err) {
                this.setState({
                    isAuthenticated: false,
                    user: {},
                    error: this.normalizeError(err)
                });
            }
        }

        async getAccessToken(authority: string, scopes: string[]): Promise<string> {
            try {
                let requestAuthority = msalConfig.authority + 'common';
                if (this.state.currentAuthority) {
                    requestAuthority = msalConfig.authority + this.state.currentAuthority;
                }
                var silentResult = await this.userAgentApplication
                    .acquireTokenSilent({
                        scopes: scopes,
                        authority: requestAuthority
                    });

                return silentResult && silentResult.accessToken;
            } catch (err) {
                // If a silent request fails, it may be because the user needs
                // to login or grant consent to one or more of the requested scopes
                if (this.isInteractionRequired(err)) {
                    var interactiveResult = await this.userAgentApplication
                        .acquireTokenPopup({
                            scopes: scopes,
                            redirectUri: msalConfig.redirectUri
                        });

                    return interactiveResult.accessToken;
                } else {
                    throw err;
                }
            }
        }

        logout() {
            this.userAgentApplication.logout();
        }

        normalizeError(error: string | Error): any {
            var normalizedError = {};
            if (typeof (error) === 'string') {
                var errParts = error.split('|');
                normalizedError = errParts.length > 1 ?
                    { message: errParts[1], debug: errParts[0] } :
                    { message: error };
            } else {
                normalizedError = {
                    message: error.message,
                    debug: JSON.stringify(error)
                };
            }
            return normalizedError;
        }

        isInteractionRequired(error: Error): boolean {
            if (!error.message || error.message.length <= 0) {
                return false;
            }

            return (
                error.message.indexOf('consent_required') > -1 ||
                error.message.indexOf('interaction_required') > -1 ||
                error.message.indexOf('login_required') > -1 ||
                error.message.indexOf('no_account_in_silent_request') > -1
            );
        }

        async fetchUserAdmins(userToken: string): Promise<boolean> {
            var url = basicURLS.clientservicepermissionsSaveURL;
            return new Promise((resolve, reject) => {
                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': userToken
                    }
                })
                    .then(response => {
                        resolve(response.json());
                    })
                    .catch(error => {
                        this.setState({
                            isAuthenticated: false,
                            error: this.normalizeError(Constants.UserAdminErrorMessage)
                        });
                        reject(error);
                    });
            });
        }

        async isUserAdmin(res: boolean) {
            if (res) {
                this.setState({
                    isAuthenticated: true,
                    error: null
                });
            }
        }
    }
}