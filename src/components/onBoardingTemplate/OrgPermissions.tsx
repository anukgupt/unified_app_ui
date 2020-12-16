import * as React from 'react';
import '../../css/onBoarding/Template.css';
import { onBoardingObject } from "./OnBoardingTemplate";
import icon from '../../images/icon.png';
import down from '../../images/downarrow.png';
import cross from "../../images/cross.png";
import tick from "../../images/tick.png";
import { SelectMenu, Button } from '@primer/components';
import * as Constants from "../../Constants";

const organizationPermissions = [
    { "id": "members", "text": "Members", "note": "Organization members and teams.", "accessLevel": ["No access", "Read-only", "Read & Write"], "link": "https://docs.github.com/v3/apps/permissions/#permission-on-members" },
    { "id": "organizationadministration", "text": "Administration", "note": "Manage access to an organization.", "accessLevel": ["No access", "Read-only", "Read & Write"], "link": "https://docs.github.com/v3/apps/permissions/#permission-on-organization-administration" },
    { "id": "organizationwebhooks", "text": "Webhooks", "note": "Manage the post-receive hooks for an organization.", "accessLevel": ["No access", "Read-only", "Read & Write"], "link": "https://docs.github.com/v3/apps/permissions/#permission-on-organization-hooks" },
    { "id": "organizationplan", "text": "Plan", "note": "View an organization's plan.", "accessLevel": ["No access", "Read-only"], "link": "https://docs.github.com/v3/apps/permissions/" },
    { "id": "organizationprojects", "text": "Projects", "note": "Manage organization projects, columns, and cards.", "accessLevel": ["No access", "Read-only", "Read & Write", "Admin"], "link": "https://docs.github.com/v3/apps/permissions/#permission-on-organization-projects" },
    { "id": "organizationsecrets", "text": "Secrets", "note": "Manage organization secrets.", "accessLevel": ["No access", "Read-only", "Read & Write"], "link": "https://docs.github.com/v3/apps/permissions/" },
    { "id": "selfhostedrunners", "text": "Self-hosted runners", "note": "View and manage Actions self-hosted runners available to an organization.", "accessLevel": ["No access", "Read-only", "Read & Write"], "link": "https://docs.github.com/v3/apps/permissions/" },
    { "id": "blockingusers", "text": "Blocking users", "note": "View and manage users blocked by the organization.", "accessLevel": ["No access", "Read-only", "Read & Write"], "link": "https://docs.github.com/v3/apps/permissions/#permission-on-organization-user-blocking" },
    { "id": "teamdiscussions", "text": "Team discussions", "note": "Manage team discussions and related comments.", "accessLevel": ["No access", "Read-only", "Read & Write"], "link": "https://docs.github.com/v3/apps/permissions/#permission-on-team-discussions" }
];
interface IOrgPermissionsProps {
    setTemplateState: any;
    onBoardingTemplateObject: onBoardingObject;
}
class OrgPermissions extends React.Component<IOrgPermissionsProps> {
    constructor(props: any) {
        super(props);
        this.initializeOrgPermissions();
    }

    initializeOrgPermissions() {
        let onBoardingTemplateObject = this.props.onBoardingTemplateObject;
        organizationPermissions.map(organizationPermission => {
            onBoardingTemplateObject.orgPermissions[organizationPermission.id] = organizationPermission.accessLevel[0]
        })
        this.props.setTemplateState(onBoardingTemplateObject);
    }

    render() {
        let orgPerm: any = [];
        let accessLevel: any = [];
        organizationPermissions.map(organizationPermission => {
            accessLevel = [];
            organizationPermission.accessLevel.map((access, index) => {
                let hidden = true;
                if (access === this.props.onBoardingTemplateObject.orgPermissions[organizationPermission.id]) {
                    hidden = false;
                }
                accessLevel.push(
                    <SelectMenu.Item style={{ 'height': '24px', 'padding': '0px' }} key={organizationPermission.text + "" + access} id={organizationPermission.id + index} onClick={() => this.onAccessLevelClick(organizationPermission.id, access)}>
                        <div className="input-access">
                            <div className="input-access-tick">
                                <img aria-label="checked" hidden={hidden} className="tick-img" alt="" src={tick} width="16px" height="16px" />
                            </div>
                            <div className="input-access-text">
                                {access}
                            </div>
                        </div>
                    </SelectMenu.Item >
                );
            });
            orgPerm.push(
                <div key={organizationPermission.id} className="org-permission-item tableobject">
                    <div className="tableobject-cell-primary">
                        <div>{organizationPermission.text}
                            <a target="_blank" className="link" aria-label="info" href={organizationPermission.link}>
                                <img className="info-img" alt="" src={icon} width="16px" height="16px" />
                            </a>
                        </div>
                        <p className="note">{organizationPermission.note}</p>
                    </div>
                    <div className="tableobject-cell-intermediate">
                        Access:
                    </div>
                    <div className="tableobject-cell-secondary">
                        <SelectMenu className="select-menu">
                            <Button as="summary" className="selectmenu-button" style={{ 'padding': '2px', 'width': '180px', 'border': ' 1px solid #8A8886', 'borderRadius': '2px', 'backgroundColor': '#fff', 'lineHeight': '18px' }}>
                                <span className="selectmenu-button-text">{this.props.onBoardingTemplateObject.orgPermissions[organizationPermission.id]}</span>
                                <img className="down-img" alt="" src={down} />
                            </Button>
                            <SelectMenu.Modal width="185px">
                                <SelectMenu.Header style={{ 'padding': '0', 'height': '24px' }}>
                                    <span className="select-menu-header-text">{Constants.SelectMenuHeading}</span>
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
                <div className="organization-permissions" aria-label="organization-permissions">
                    {orgPerm}
                </div>
            </div >

        )
    }

    onAccessLevelClick(id: string, accessValue: string) {
        let onBoardingTemplateObject = this.props.onBoardingTemplateObject;
        onBoardingTemplateObject.orgPermissions[id] = accessValue;
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
export default OrgPermissions