import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Mapping from './installationMapping/Mapping';
import OnBoardingTemplate from './onBoardingTemplate/OnBoardingTemplate';

class Template extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/onBoarding" component={OnBoardingTemplate}></Route>
                        <Route exact path="/installation" component={Mapping}></Route>
                    </Switch>
                </Router>
            </div>)
    }
}
export default Template;