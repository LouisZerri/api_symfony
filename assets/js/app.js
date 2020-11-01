import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import '../css/app.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';

import { Redirect, HashRouter, Route, Switch, withRouter } from "react-router-dom";
import CustomersPage from './pages/CustomersPage';
import InvoicesPage from "./pages/InvoicesPage";
import LoginPage from "./pages/LoginPage";
import AuthApi from "./services/authApi";

import AuthContext from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import CustomerPage from "./pages/CustomerPage";

//Pour les routes : aller du plus détaillé au plus général

AuthApi.setup()

const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(AuthApi.isAuthenticated)

    const NavbarWithRouter = withRouter(Navbar)

    const contextValue = {
        isAuthenticated,
        setIsAuthenticated
    }

    return (
        <AuthContext.Provider value={contextValue}>
            <HashRouter>
            <NavbarWithRouter />

            <main className="container pt-5">
                <Switch>
                    <PrivateRoute path="/customers/:id" isAuthenticated={isAuthenticated} component={CustomerPage} />
                    <PrivateRoute path="/customers" isAuthenticated={isAuthenticated} component={CustomersPage} />
                    <PrivateRoute path="/invoices" isAuthenticated={isAuthenticated} component={InvoicesPage}/>
                    <Route
                        path="/login"
                        render={props => (<LoginPage onLogin={setIsAuthenticated} {...props} /> )}
                    />
                    <Route path="/" component={HomePage}/>
                </Switch>
            </main>
        </HashRouter>
        </AuthContext.Provider>)

}

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);
