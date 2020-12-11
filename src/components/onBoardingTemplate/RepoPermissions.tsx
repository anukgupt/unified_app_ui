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
        // const menuContext = React.useContext(SelectMenu.MenuContext);
    }

    initializeRepoPermissions() {
        let onBoardingTemplateObject = this.props.onBoardingTemplateObject;
        repositoryPermissions.map(repo => {
            onBoardingTemplateObject.repoPermissions[repo.id] = repo.accessLevel[0]
        });
        onBoardingTemplateObject.domainList = [];
        this.props.setTemplateState(onBoardingTemplateObject);
    }

    render() {
        let repoPerm: any = [];
        let accessLevel: any = [];
        let hidemandatoryLabel: boolean;
        let domainUI: any = null;
        repositoryPermissions.map(repo => {
            accessLevel = [];
            hidemandatoryLabel = true;
            if (repo.id === Constants.metadataId) {
                hidemandatoryLabel = this.hidemandatoryLabel
            }
            repo.accessLevel.map(access => {
                let hidden = true;
                if (access === this.props.onBoardingTemplateObject.repoPermissions[repo.id]) {
                    hidden = false;
                }
                accessLevel.push(
                    <SelectMenu.Item key={repo.text + " " + access} onClick={() => this.onAccessLevelClick(repo.id, access)}>
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
            //Domain UI for Content References repo permissions
            domainUI = null;
            if (repo.id === Constants.contentreferencesId &&
                (this.props.onBoardingTemplateObject.repoPermissions[Constants.contentreferencesId] === Constants.ReadOnlyAccess ||
                    this.props.onBoardingTemplateObject.repoPermissions[Constants.contentreferencesId] === Constants.ReadWriteAccess)) {
                domainUI = this.addDomainUI();
            }
            repoPerm.push(
                <div key={repo.id} className="repo-permission-item tableobject">
                    <div className="tableobject-cell-primary">
                        <div className="text-bold">{repo.text}
                            <a className="link" aria-label="info" href={repo.link}>
                                <img className="info-img" alt="" src={icon} width="16px" height="16px" />
                            </a>
                        </div>
                        <p className="note">{repo.note}</p>
                    </div>
                    <div className="tableobject-cell-intermediate">
                        Access:
                    </div>
                    {<div className="input-mandatory" hidden={hidemandatoryLabel}>{Constants.mandatoryLabel}</div>}
                    <div className="tableobject-cell-secondary padding-input-access">
                        <SelectMenu>
                            <Button as="summary" className="selectmenu-button" style={{ 'padding': '2px', 'width': '180px', 'border': 'border: 1px solid #8A8886', 'borderRadius': '2px', 'backgroundColor': '#fff' }}>
                                <span className="selectmenu-button-text">{this.props.onBoardingTemplateObject.repoPermissions[repo.id]}</span>
                                <img className="down-img" alt="" src={down} />
                            </Button>
                            <SelectMenu.Modal width="212px">
                                <SelectMenu.Header>
                                    <span>{Constants.SelectMenuHeading}</span>
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
            repoPerm.push(
                domainUI
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
        if (id === Constants.contentreferencesId &&
            (this.props.onBoardingTemplateObject.repoPermissions[Constants.contentreferencesId] === Constants.NoAccess)) {
            onBoardingTemplateObject.domainList.splice(0, onBoardingTemplateObject.domainList.length);
        }
        this.props.setTemplateState(onBoardingTemplateObject);
        //document.getElementById(id)?.focus();
    }

    addDomainUI() {
        let domainList: string[] = this.props.onBoardingTemplateObject.domainList;
        let domainUI: any = [];
        domainList.map((domainName, index) => {
            domainUI.push(
                <li className="row-content">
                    <div className="row-content-data">{domainName}</div>
                    <button type="button" aria-label="Delete this Domain" className="domain-add-button" onClick={() => this.removeFromDomainList(index)}>
                        <img className="cross-img" alt="" src={cross} width="10ox" height="10px" />
                    </button>
                </li>
            );
        });
        let finalList: any = [];
        if (domainList.length > 0) {
            finalList.push(
                <div className="box-domain-list">
                    <ul className="domain-list">
                        {domainUI}
                    </ul>
                </div>
            );
        }
        return (
            <div className="repo-permission-item">
                <dl>
                    <dt>
                        <label htmlFor="domain-repo">{Constants.DomainHeading}</label>
                    </dt>
                    <dd>
                        <input id="domain-repo" className="input-text" type="text"></input>
                        <button type="button" aria-label="Add Domain" className="" onClick={this.addtoDomainList}>{Constants.Add}</button>
                        <p className="note">{Constants.DomainDescription}</p>
                    </dd>
                </dl>
                <div>{finalList}</div>
            </div >
        )
    }

    addtoDomainList = () => {
        let onBoardingTemplateObject = this.props.onBoardingTemplateObject;
        onBoardingTemplateObject.domainList.push((document.getElementById("domain-repo") as HTMLInputElement).value + "");
        (document.getElementById("domain-repo") as HTMLInputElement).value = "";
        this.setState(onBoardingTemplateObject);
    }

    removeFromDomainList = (index: number, removeAll?: boolean) => {
        let count = 1;
        let onBoardingTemplateObject = this.props.onBoardingTemplateObject;
        if (removeAll) {
            count = onBoardingTemplateObject.domainList.length;
        }
        onBoardingTemplateObject.domainList.splice(index, count);
        this.setState(onBoardingTemplateObject);
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