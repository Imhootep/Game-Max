import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import React, { useEffect, useState } from 'react';
import React from 'react';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Studio from '../../pages/Studio';
import Login from '../../pages/Login';
import Admin from '../../pages/Admin';
import Trending from '../../pages/Trending'



const Index = () => {

    // const user = useSelector((state)=> state.userReducer)

    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/home" exact component={Home} />
                    <Route path="/profil" exact component={Profil} />
                    <Route path="/studio" exact component={Studio} />
                    <Route path="/trending" exact component={Trending} />
                    <Route path="/admin" exact component={Admin} />
                    {/* {user.isAdmin === true ? <Route path="/admin" exact component={Admin} /> : "" } */}
                    <Redirect to="/" />
                </Switch>
            </Router>
        </div>
    );
};

export default Index;