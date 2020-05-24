import React from 'react';
import {
    Router, Switch, Redirect, Route,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import history from './history';
import MainLayout from './layout/MainLayout';
import AppLayout from './layout/AppLayout';
import AdminControl from './pages/AdminControl';
import Category from './pages/Category';

function dummyLayout(props) {
    return props.children;
}

function AppRoute({ component: Page, layout, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => {
                const Layout = layout || dummyLayout;

                return (
                    <MainLayout {...props}>
                        <Layout {...props}>
                            <Page {...props} />
                        </Layout>
                    </MainLayout>
                );
            }}
        />
    );
}

export default function App() {
    return (
        <Router history={history}>
            <Switch>
                <AppRoute component={AdminControl} layout={AppLayout} path="/control" exact/>
                <AppRoute component={Category} layout={AppLayout} path="/control/:category" exact/>

                <Redirect from="*" to="/control" />
            </Switch>
        </Router>
    );
}

AppRoute.propTypes = {
    component: PropTypes.func.isRequired,
    layout: PropTypes.func
};

AppRoute.defaultProps = {
    layout: null
};
