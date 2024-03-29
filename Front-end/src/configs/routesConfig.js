import constants from 'constants/index.js';
import HomePage from 'containers/HomePage';
import ProductDetailPage from 'containers/ProductDetailPage';
import React from 'react';
import { Route } from 'react-router-dom';

// lazy loading
const SignUp = React.lazy(() => import('containers/SignUp'));
const Login = React.lazy(() => import('containers/Login'));
const NotFound = React.lazy(() => import('components/NotFound'));
const Cart = React.lazy(() => import('components/Cart'));
const AdminPage = React.lazy(() => import('containers/AdminPage'));
const SearchResult = React.lazy(() =>
  import('containers/SearchFilterPage/Search'),
);
const FilterResult = React.lazy(() =>
  import('containers/SearchFilterPage/Filter'),
);
const AccountPage = React.lazy(() => import('containers/AccountPage'));
const PaymentSuccess = React.lazy(() => import('containers/ResultPayment'))

const routes = [
  {
    path: constants.ROUTES.HOME,
    exact: true,
    main: () => <HomePage />,
  },
  {
    path: constants.ROUTES.PRODUCT,
    main: () => <ProductDetailPage />,
  },
  {
    path: constants.ROUTES.SIGNUP,
    exact: true,
    main: () => <SignUp />,
  },
  {
    path: constants.ROUTES.LOGIN,
    exact: true,
    main: () => <Login />,
  },
  {
    path: constants.ROUTES.ADMIN,
    main: props  => <AdminPage {...props} />,
  },
  {
    path: constants.ROUTES.CART,
    exact: false,
    main: () => <Cart list={[]} />,
  },
  {
    path: constants.ROUTES.NOT_FOUND,
    exact: true,
    main: () => <NotFound />,
  },
  {
    path: constants.ROUTES.SEARCH,
    exact: true,
    main: () => <SearchResult />,
  },
  {
    path: constants.ROUTES.FILTER,
    exact: true,
    main: () => <FilterResult />,
  },
  {
    path: constants.ROUTES.ACCOUNT,
    exact: false,
    main: () => <AccountPage />,
  },
 {
    path: constants.ROUTES.PAYMENTSC,
    exact: true,
    main: () => <PaymentSuccess />,
  },
];

// render routes
const renderRoutes = (routes) => {
  return routes.map((route, index) => {
    const { path, exact, main } = route;
    return <Route key={index} path={path} exact={exact} component={main} />;
  });
};

export default {
  routes,
  renderRoutes,
};
