import React from 'react'
import {HashRouter,Route,Switch,Redirect} from'react-router-dom'
import Error from './Error'
import App from  './App'
export default ()=>(
    <HashRouter>
        <Switch>
            <Route exact  path="/"  render={()=>(
                <Redirect to={'/login'}></Redirect>
            )}   />
            <Route  path="/login" component={App}  />
            <Route path="/404" component={Error} />
            <Route component={Error} />
        </Switch>
    </HashRouter>
)
