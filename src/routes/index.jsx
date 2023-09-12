import Home from '../pages/Home';
import { NoHeaderLayout } from '../layouts';
import Collections from '../pages/Collections';
import {LogIn , Register }from '../pages/Authen';
import Cart from '../pages/Cart';
import CheckOut from '../pages/CheckOut';
import Product from '../pages/Product';
import OrderTracking from '../pages/OrderTracking';
import Search from '../pages/Search';
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/collections', component: Collections },
    { path: '/login', component: LogIn },
    { path: '/register', component: Register },
    { path: '/cart', component: Cart },
    { path: '/checkout', component: CheckOut, layout: NoHeaderLayout },
    { path: '/collections/:productId', component: Product },
    { path: '/ordertracking/:userId', component: OrderTracking },
    { path: '/search/:query', component: Search }
];

const privateRoutes = [];
export { publicRoutes , privateRoutes };
