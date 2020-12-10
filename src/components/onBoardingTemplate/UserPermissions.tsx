import * as React from 'react';
import '../../css/onBoarding/Template.css';
import { onBoardingObject } from "./OnBoardingTemplate";
import icon from '../../images/icon.png';
import down from '../../images/downarrow.png';
import cross from "../../images/cross.png";
import tick from "../../images/tick.png";
import { SelectMenu, Button } from '@primer/components';
import * as Constants from "../../Constants";

const userPermissions = [
    { "id": "blockanotheruser", "text": "Block another user", "note": "View and manage users blocked by the user.", "accessLevel": ["No access", "Read-only", "Read & Write"], "link": "https://docs.github.com/v3/apps/permissions/#permission-on-blocking" },
    { "id": "emailaddresses", "text": "Email addresses", "note": "Manage a user's email addresses.", "accessLevel": ["No access", "Read-only", "Read & Write"], "link": "https://docs.github.com/v3/apps/permissions/#permission-on-emails" },
    { "id": "followers", "text": "Followers", "note": "A user's followers", "accessLevel": ["No access", "Read-only", "Read & Write"], "link": "https://docs.github.com/v3/apps/permissions/#permission-on-followers" },
    { "id": "gpgkeys", "text": "GPG keys", "note": "View and manage a user's GPG keys.", "accessLevel": ["No access", "Read-only", "Read & Write"], "link": "https://docs.github.com/v3/apps/permissions/#permission-on-gpg-keys" },
    { "id": "gitsshkeys", "text": "Git SSH keys", "note": "Git SSH keys", "accessLevel": ["No access", "Read-only", "Read & Write"], "link": "https://docs.github.com/v3/apps/permissions/#permission-on-keys" },
    { "id": "plan", "text": "Plan", "note": "View a user's plan.", "accessLevel": ["No access", "Read-only"], "link": "https://docs.github.com/v3/apps/permissions/" },
    { "id": "starring", "text": "Starring", "note": "List and manage repositories a user is starring.", "accessLevel": ["No access", "Read-only", "Read & Write"], "link": "https://docs.github.com/v3/apps/permissions/#permission-on-starring" },
    { "id": "watching", "text": "Watching ", "note": "List and change repositories a user is subscribed to.", "accessLevel": ["No access", "Read-only", "Read & Write"], "link": "https://docs.github.com/v3/apps/permissions/#permission-on-watching" }
];
interface IUserPermissionsProps {
    setTemplateState: any;
    onBoardingTemplateObject: onBoardingObject;
}
class UserPermissions extends React.Component<IUserPermissionsProps> {
    constructor(props: any) {
        super(props);
        this.initializeUserPermissions();
    }

    initializeUserPermissions() {
        let onBoardingTemplateObject = this.props.onBoardingTemplateObject;
        userPermissions.map(userPermission => {
            onBoardingTemplateObject.userPermissions[userPermission.id] = userPermission.accessLevel[0]
        });
        this.props.setTemplateState(onBoardingTemplateObject);
    }

    render() {
        let userPerm: any = [];
        let accessLevel: any = [];
        userPermissions.map(userPermission => {
            accessLevel = [];
            userPermission.accessLevel.map((access, index) => {
                let hidden = true;
                if (access === this.props.onBoardingTemplateObject.userPermissions[userPermission.id]) {
                    hidden = false;
                }
                accessLevel.push(
                    <SelectMenu.Item key={userPermission.text + " " + access} id={userPermission.id + access + index} href="#" onClick={() => this.onAccessLevelClick(userPermission.id, access)}>
                        <div className="input-access">
                            <div className="input-access-tick">
                                <img aria-label="checked" hidden={hidden} className="tick-img" alt="" src={tick} width="16px" height="16px" />
                            </div>
                            <div aria-checked={true} className="input-access-text">
                                {access}
                            </div>
                        </div>
                    </SelectMenu.Item>
                );
            });
            userPerm.push(
                <div key={userPermission.id} className="user-permission-item tableobject">
                    <div className="tableobject-cell-primary">
                        <div className="text-bold">{userPermission.text}
                            <a className="link" aria-label="info" href={userPermission.link}>
                                <img className="info-img" alt="" src={icon} width="16px" height="16px" />
                            </a>
                        </div>
                        <p className="note">{userPermission.note}</p>
                    </div>
                    <div className="tableobject-cell-intermediate">
                        Access:
                    </div>
                    <div className="tableobject-cell-secondary">
                        <SelectMenu>
                            <Button as="summary" className="selectmenu-button">
                                <span className="selectmenu-button-text">{this.props.onBoardingTemplateObject.userPermissions[userPermission.id]}</span>
                                <img className="down-img" alt="" src={down} />
                            </Button>
                            <SelectMenu.Modal width="212px">
                                <SelectMenu.Header>
                                    <span>{Constants.SelectMenuHeading}</span>
                                    <this.AccessLevelCloseButton />
                                </SelectMenu.Header>
                                <SelectMenu.List>
                                    {accessLevel}
                                </SelectMenu.List>
                            </SelectMenu.Modal>
                        </SelectMenu>
                    </div>
                </div>
            )
        });
        return (
            <div className="permissions">
                <div className="user-permissions" aria-label="user-permissions">
                    <div className="user-permissions-description">
                        <p>
                            {Constants.UserPermissionDescription1}
                            <a href={Constants.UserPermissionDescriptionLink}>{Constants.UserPermissionDescriptionForLink}</a>
                            {Constants.UserPermissionDescription2}
                        </p>
                    </div>
                    {userPerm}
                </div>
            </div>

        )
    }

    onAccessLevelClick(id: string, accessValue: string) {
        let onBoardingTemplateObject = this.props.onBoardingTemplateObject;
        onBoardingTemplateObject.userPermissions[id] = accessValue;
        this.props.setTemplateState(onBoardingTemplateObject);
    }

    AccessLevelCloseButton = () => {
        const menuContext = React.useContext(SelectMenu.MenuContext);
        return (
            <button type="button" aria-label="close menu" className="cross-img-button" onClick={() => {
                menuContext.setOpen(false);
            }}>
                <img className="cross-img" alt="" src={cross} width="10px" height="10px" />
            </button>
        );
    }
}

export default UserPermissions
