import React from 'react';
import { hot } from 'react-hot-loader/root';

import MainPage from './routes/MainPage/MainPage';
import FormPage from './routes/FormPage/FormPage';

import { BrowserRouter as Router, Route} from 'react-router-dom';

const App = () => {

    return (
        <Router>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/form" component={FormPage} />
        </Router>
    );
};

export default hot(App);
