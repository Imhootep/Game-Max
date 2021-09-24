import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Trending from '../../pages/Trending';
import Login from '../../pages/Login';




const index = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/home" exact component={Home} />
                    <Route path="/profil" exact component={Profil} />
                    <Route path="/trending" exact component={Trending} />
                    <Redirect to="/" />
                </Switch>
            </Router>
        </div>
    );
};

export default index;