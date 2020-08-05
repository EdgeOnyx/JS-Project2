import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from './pages/Home';
import Login from './sessions/Login';
import Logout from './sessions/Logout';
import Teams from './teams/Index';

import NewTeam from './teams/New';
import EditTeam from './teams/Edit';
 function Routes ({user, setUser}) {
     return(
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" render={
                renderProps => <Login
                  {...renderProps}
                  setUser={setUser}
                />
              }/>
              <Route exact path="/logout" render={
                renderProps => <Logout
                  {...renderProps}
                  setUser={setUser}
                />
              }/>
              <Route exact path="/teams" render={
                renderProps => <Teams
                  {...renderProps}
                  user={user}
                />
              }/>
              <Route exact path="/teams/new" component={NewTeam}/>
              <Route exact path="/teams/edit" component={EditTeam}/>
         </Switch>
     );
 }

 export default Routes;