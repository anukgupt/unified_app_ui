import * as React from 'react';
import '../../css/onBoarding/Template.css';
import { onBoardingObject } from "./OnBoardingTemplate";
import icon from '../../images/icon.png';
import down from '../../images/downarrow.png';
import cross from "../../images/cross.png";
import tick from "../../images/tick.png";
import { SelectMenu, Button } from '@primer/components';
import * as Constants from "../../Constants";

const repositoryPermissions = [
    { "id": "actions", "text": "Actions", "note": "Workflows, workflow runs and artifacts.", "accessLevel": ["No access", "Read-only", "Read & Write"], "link": "https://docs.github.com/v3/apps/permissions/" },
    { "id": "administration", "text": "Administration", "note": "Repository creation, deletion, settings, teams, and collaborators.", "accessLevel": ["No access", "Read-only", "Read & Write"], "link": "https://docs.github.com/v3/apps/permissions/#permission-on-administration" },
    { "id": "checks", "text": "Checks", "note": "Checks on code", "accessLevel": ["No access", "Read-only", "Read & Write"], "link": "https://docs.github.com/v3/apps/permissions/#permission-on-checks" },
    { "id": "contentreferences", "text": "Content references", "note": "Get notified of content references, and create content attachments.", "accessLevel": ["No access", "Read-only", "Read & Write"], "link": "https://docs.github.com/v3/apps/permissions/" },
    { "id": "contents", "text": "Contents", "note": "Repository contents, commits, branches, downloads, releases, and merges.", "accessLevel": ["No access", "Read-only", "Read & Write"], "link": "https://docs.github.com/v3/apps/permissions/#permission-on-contents" },
    { "id": "deployments", "text": "Deployments", "note": "Deployments and deployment statuses.", "accessLevel": ["No access", "Read-only", "Read & Write"], "link": "https://docs.github.com/v3/apps/permissions/#permission-on-contents" },
    { "id": "issues", "text": "Issues", "note": "Issues and related comments, assignees, labels, and milestones.", "accessLevel": ["No access", "Read-only", "Read & Write"], "link": "https://docs.github.com/v3/apps/permissions/#permission-on-issues" },
    { "id": "metadata", "text": "Metadata", "note": "Search repositories, list collaborators, and access repository metadata.", "accessLevel": ["No access", "Read-only"], "link": "https://docs.github.com/v3/apps/permissions/#metadata-permissions" },
    { "id": "packages", "text": "Packages", "note": "Packages published to the GitHub Package Platform.", "accessLevel": ["No access", "Read-only", "Read & Write"], "link": "https://docs.github.com/v3/apps/permissions/#permission-on-packages" },
    { "id": "pages", "text": "Pages ", "note": "Retrieve Pages statuses, configuration, and builds, as well as create new builds.", "accessLevel": ["No access", "Read-only", "Read & Write"], "link": "https://docs.github.com/v3/apps/permissions/#permission-on-pages" },
    { "id": "pullrequests", "text": "Pull requests", "note": "Pull requests and related comments, assignees, labels, milestones, and merges.", "accessLevel": ["No access", "Read-only", "Read & Write"], "link": "https://docs.github.com/v3/apps/permissions/#permission-on-pull-requests" },
    { "id": "webhooks", "text": "Webhooks", "note": "Manage the post-receive hooks for a repository.", "accessLevel": ["No access", "Read-only", "Read & Write"], "link": "https://docs.github.com/v3/apps/permissions/#permission-on-repository-hooks" },
    { "id": "projects", "text": "Projects", "note": "Manage repository projects, columns, and cards.", "accessLevel": ["No access", "Read-only", "Read & Write", "Admin"], "link": "https://docs.github.com/v3/apps/permissions/#permission-on-repository-projects" },
    { "id": "secrets", "text": "Secrets", "note": "Manage repository secrets.", "accessLevel": ["No access", "Read-only", "Read & Write"], "link": "https://docs.github.com/v3/apps/permissions/" },
    { "id": "securityevents", "text": "Security events", "note": "View and manage security events like code scanning alerts.", "accessLevel": ["No access", "Read-only", "Read & Write"], "link": "https://docs.github.com/v3/apps/permissions/" },
    { "id": "singlefile", "text": "Single file", "note": "Manage just a single file.", "accessLevel": ["No access", "Read-only", "Read & Write"], "link": "https://docs.github.com/v3/apps/permissions/#permission-on-single-file" },
    { "id": "commitstatuses", "text": "Commit statuses", "note": "Commit statuses", "accessLevel": ["No access", "Read-only", "Read & Write"], "link": "https://docs.github.com/v3/apps/permissions/#permission-on-statuses" },
    { "id": "pependabotalerts", "text": "Dependabot alerts", "note": "Retrieve Dependabot alerts.", "accessLevel": ["No access", "Read-only"], "link": "https://docs.github.com/v4/object/repositoryvulnerabilityalert/" },
    { "id": "workflows", "text": "Workflows", "note": "Update GitHub Action workflow files.", "accessLevel": ["No access", "Read-only"], "link": "https://docs.github.com/v3/apps/permissions/" }

];
interface IRepoPermissionsProps {
    setTemplateState: any;
    onBoardingTemplateObject: onBoardingObject;
}
class RepoPermissions extends React.Component<IRepoPermissionsProps> {
    constructor(props: any) {
        super(props);
        this.initializeRepoPermissions();
    }

    initializeRepoPermissions() {
        let onBoardingTemplateObject = this.props.onBoardingTemplateObject;
        repositoryPermissions.map(repo => {
            onBoardingTemplateObject.repoPermissions[repo.id] = repo.accessLevel[0]
        });
        this.props.setTemplateState(onBoardingTemplateObject);
    }

    render() {
        let repoPerm: any = [];
        let accessLevel: any = [];
        let hidemandatoryLabel: boolean;
        repositoryPermissions.map(repo => {
            accessLevel = [];
            hidemandatoryLabel = true;
            if (repo.id === Constants.metadataId) {
                hidemandatoryLabel = this.hidemandatoryLabel
            }
            repo.accessLevel.map((access, index) => {
                let hidden = true;
                if (access === this.props.onBoardingTemplateObject.repoPermissions[repo.id]) {
                    hidden = false;
                }
                accessLevel.push(
                    <SelectMenu.Item style={{ 'height': '24px', 'padding': '0px' }} key={repo.text + " " + access} id={repo.id + index} onClick={() => this.onAccessLevelClick(repo.id, access)}>
                        <div className="input-access">
                            <div className="input-access-tick">
                                <img aria-label="checked" hidden={hidden} className="tick-img" alt="" src={tick} width="16px" height="16px" />
                            </div>
                            <div className="input-access-text">
                                {access}
                            </div>
                        </div>
                    </SelectMenu.Item>
                );
            });
            repoPerm.push(
                <div key={repo.id} className="repo-permission-item tableobject">
                    <div className="tableobject-cell-primary">
                        <div>{repo.text}
                            <a className="link" aria-label="info" href={repo.link}>
                                <img className="info-img" alt="" src={icon} width="16px" height="16px" />
                            </a>
                        </div>
                        <p className="note">{repo.note}</p>
                    </div>
                    {<div className="input-mandatory" hidden={hidemandatoryLabel}>{Constants.mandatoryLabel}</div>}
                    <div className="tableobject-cell-intermediate">
                        Access:
                    </div>
                    <div className="tableobject-cell-secondary">
                        <SelectMenu className="select-menu">
                            <Button as="summary" className="selectmenu-button" style={{ 'padding': '2px', 'width': '180px', 'border': ' 1px solid #8A8886', 'borderRadius': '2px', 'backgroundColor': '#fff', 'lineHeight': '18px' }}>
                                <span className="selectmenu-button-text">{this.props.onBoardingTemplateObject.repoPermissions[repo.id]}</span>
                                <img className="down-img" alt="" src={down} />
                            </Button>
                            <SelectMenu.Modal width="185px">
                                <SelectMenu.Header style={{ 'padding': '0', 'height': '24px' }}>
                                    <span className="select-menu-header-text">{Constants.SelectMenuHeading}</span>
                                    <this.accessLevelCloseButton />
                                </SelectMenu.Header>
                                <SelectMenu.List>
                                    {accessLevel}
                                </SelectMenu.List>
                            </SelectMenu.Modal>
                        </SelectMenu>
                    </div>
                </div>
            );
        });
        return (
            <div className="permissions">
                <div className="repository-permissions" aria-label="repository-permissions">
                    {repoPerm}
                </div>
            </div>
        )
    }

    checkMandatoryLabel(onBoardingTemplateObject: onBoardingObject) {
        repositoryPermissions.map(repositoryPermission => {
            if ((onBoardingTemplateObject.repoPermissions[repositoryPermission.id] === Constants.ReadOnlyAccess ||
                onBoardingTemplateObject.repoPermissions[repositoryPermission.id] === Constants.ReadWriteAccess) &&
                repositoryPermission.id !== Constants.metadataId && repositoryPermission.id !== Constants.contentsId) {
                this.hidemandatoryLabel = false;
            }
        });
    }

    onAccessLevelClick(id: string, accessValue: string) {
        let onBoardingTemplateObject = this.props.onBoardingTemplateObject;
        onBoardingTemplateObject.repoPermissions[id] = accessValue;
        this.hidemandatoryLabel = true;
        this.checkMandatoryLabel(onBoardingTemplateObject);
        if (!this.hidemandatoryLabel) {
            onBoardingTemplateObject.repoPermissions[Constants.metadataId] = Constants.ReadOnlyAccess;
        }
        this.props.setTemplateState(onBoardingTemplateObject);
    }

    accessLevelCloseButton = () => {
        const menuContext = React.useContext(SelectMenu.MenuContext);
        return (
            <button type="button" aria-label="close menu" className="cross-img-button" onClick={() => {
                menuContext.setOpen(false);
            }}>
                <img className="cross-img" alt="" src={cross} width="10px" height="10px" />
            </button>
        );
    }

    private hidemandatoryLabel: boolean = true;
}
export default RepoPermissions