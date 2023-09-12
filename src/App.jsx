import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DefaultLayout } from './layouts';
import { publicRoutes } from './routes/index.jsx';
import { CartContext } from './contexts/CartContext';
import { useState } from 'react';
import FirebaseProvider from './contexts/FirebaseContext';
import useLocalStorage from '../src/hooks/useLocalStorage';
function App() {
    const [cartList, setCartList] = useLocalStorage("cartList", []);
    const cartQuantityAdd = (id) => {
        setCartList(
            cartList.map((cartItem) => {
                if (cartItem.id == id) {
                    return {
                        ...cartItem,
                        quantity: cartItem.quantity + 1,
                    };
                }
                return {
                    ...cartItem,
                };
            }),
        );
    };
    const cartQuantityMinus = (id) => {
        setCartList(
            cartList.map((cartItem) => {
                if (cartItem.id == id && cartItem.quantity > 1) {
                    return {
                        ...cartItem,
                        quantity: cartItem.quantity - 1,
                    };
                } else {
                    return {
                        ...cartItem,
                    };
                }
            }),
        );
    };
    const handleDeleteProductinCart = (id) => {
        setCartList(cartList.filter((cartItem) => cartItem.id !== id));
    };

    const cartTotalPrice = (cart) => {
        if (cart.length > 0) {
            const total = cart.reduce((cartSum, cartItem) => {
                return (cartSum += cartItem.quantity * cartItem.originalPrice * (1 - cartItem.discount / 100));
            }, 0);
            return total.toLocaleString('en-US');
        } else {
            return 0;
        }
    };
    const cartTotalQuantity = (cart) => {
        if (cart.length > 0) {
            return cart.reduce((cartQuantity, cartItem) => {
                return (cartQuantity += cartItem.quantity);
            }, 0);
        } else {
            return 0;
        }
    };

    const CartContextValue = {
        cartList,
        setCartList,
        cartQuantityAdd,
        cartQuantityMinus,
        cartTotalPrice,
        cartTotalQuantity,
        handleDeleteProductinCart
    };
    return (
        <Router>
            <div>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                  <FirebaseProvider>
                                        <CartContext.Provider value={CartContextValue}>
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        </CartContext.Provider>
                                    </FirebaseProvider>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
