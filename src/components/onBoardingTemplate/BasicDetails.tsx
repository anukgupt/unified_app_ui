import * as React from 'react';
import '../../css/onBoarding/Template.css';
import { onBoardingObject } from "./OnBoardingTemplate";
import * as Constants from "../../Constants";

interface IBasicDetailsProps {
    onBoardingTemplateObject: onBoardingObject;
    onClientIdChange: any;
    onWebhookURLChange: any;
    onCallbackURLChange: any;
}

class BasicDetails extends React.Component<IBasicDetailsProps> {
    render() {
        var clientIdClassName = "client-id";
        if (this.props.onBoardingTemplateObject.clientIdError) {
            var clientIdClassName = "client-id margin-bottom-on-error";
        }
        return (
            <div className="basic-details">
                <div className={clientIdClassName}>
                    <div className="">
                        <div className="subHead">{Constants.ClientId}</div>
                    </div>
                    <dl>
                        <dt>
                            <label htmlFor="clientId" className="input-label">{Constants.ClientId}</label>
                        </dt>
                        <dd>
                            <input className="input-text" type="text" id="clientId" value={this.props.onBoardingTemplateObject.clientId} onChange={this.props.onClientIdChange}></input>
                            <p className="note">{Constants.ClientIdDescription}</p>
                        </dd>
                        {
                            this.props.onBoardingTemplateObject.clientIdError &&
                            <dd className="error">
                                {Constants.ClientIdError}
                            </dd>
                        }
                    </dl>
                </div>
                <div className="webhook-url">
                    <div className="">
                        <div className="subHead">{Constants.Webhook}</div>
                    </div>
                    <dl>
                        <dt>
                            <label htmlFor="webhookURL" className="input-label">{Constants.WebhookURL}</label>
                        </dt>
                        <dd>
                            <input className="input-text" type="text" id="webhookURL" value={this.props.onBoardingTemplateObject.webhookURL} onChange={this.props.onWebhookURLChange}></input>
                            <p className="note">
                                {Constants.WebhookURLDescription1}
                                <a target="_blank" href={Constants.WebhookURLLink}>{Constants.WebhookURLDescriptionLink}</a>
                                {Constants.WebhookURLDescription2}
                            </p>
                        </dd>
                    </dl>
                </div>
                <div className="callback-url">
                    <div className="">
                        <div className="subHead">{Constants.Callback}</div>
                    </div>
                    <dl>
                        <dt>
                            <label htmlFor="callbackURL" className="input-label">{Constants.CallbackURL}</label>
                        </dt>
                        <dd>
                            <input className="input-text" type="text" id="callbackURL" value={this.props.onBoardingTemplateObject.callbackURL} onChange={this.props.onCallbackURLChange}></input>
                            <p className="note">{Constants.CallbackURLDescription}</p>
                        </dd>
                    </dl>
                </div>
            </div>
        )
    }
}
export default BasicDetails;