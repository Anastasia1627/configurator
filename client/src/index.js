import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import App from './components/App';
import Params from './components/Params';
import NotFound from './components/NotFound';
import * as serviceWorker from './serviceWorker';


const routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/params" component={Params} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
);


ReactDOM.render(routing, document.getElementById('root'));


serviceWorker.unregister();
