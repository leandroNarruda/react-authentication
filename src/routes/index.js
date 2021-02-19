import { Switch, Route} from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Register from '../pages/Register'
import RegisterTech from '../pages/RegisterTech'
import All from '../pages/All'
import NotFound from '../pages/NotFound'

const Routes = ({ setIsAuth }) => {
    return(
        <Switch>
            <Route exact path='/'>
                <Login />
            </Route>
            <Route exact path='/register'>
                <Register />
            </Route>
            <Route exact path='/home'>
                <Home setIsAuth={setIsAuth} />
            </Route>
            <Route exact path='/tech-register'>
                <RegisterTech />
            </Route>
            <Route exact path='/all'>
                <All />
            </Route>
            <Route >
                <NotFound />
            </Route>
        </Switch>
    )
}

export default Routes