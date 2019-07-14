import React from 'react'
import {HashRouter,Route,Switch,Redirect} from'react-router-dom'
import Error from './Error'
import App from  './App'
import Main from './containers/Main'
import cookies from 'react-cookies'
const  loginUser = cookies.load("user");
export default ()=>(
    <HashRouter>
        <Switch>
            <Route exact  path="/"   render={()=>(
                !loginUser ? <Redirect to={'/login'}></Redirect> : <Redirect to={'/main'}></Redirect>
            )}   />
            <Route path="/main" component={Main}/>
            <Route  path="/login"  component={App}  />
            <Route path="/404" component={Error} />
            <Route component={Error} />
        </Switch>
    </HashRouter>
)
