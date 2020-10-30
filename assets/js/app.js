import React from 'react';
import ReactDOM from 'react-dom';

import '../css/app.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';

import { HashRouter, Switch, Route } from "react-router-dom";
import CustomersPage from './pages/CustomersPage';
import InvoicesPage from "./pages/InvoicesPage";
import LoginPage from "./pages/LoginPage";
import AuthApi from "./services/authApi";

//Pour les routes : aller du plus détaillé au plus général

AuthApi.setup()

const App = () => {
    return <HashRouter>
        <Navbar  />

        <main className="container pt-5">
            <Switch>
                <Route path="/customers" component={CustomersPage}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/invoices" component={InvoicesPage}/>
                <Route path="/" component={HomePage}/>
            </Switch>
        </main>
    </HashRouter>
}

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);
