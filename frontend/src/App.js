import Home from "./components/Home";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductSearch from "./components/product/ProductSearch";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Shipping from "./components/cart/Shipping";
import CartC from "./components/cart/Cart";

import { useEffect, useState, lazy, Suspense, useMemo } from "react";
import store from "./store";
import { loadUser } from "./actions/userActions";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import ResetPassword from "./components/user/ResetPassword";
import GuestRoute from "./components/route/GuestRoute";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/cart/OrderSuccess";
import UserOrder from "./components/order/UserOrder";
import OrderDetail from "./components/order/OrderDetail";
import Dashboard from "./components/admin/Dashboard";
import ProductsList from "./components/admin/ProductsList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrderList from "./components/admin/OrderList";
import UpdateOrder from "./components/admin/UpdateOrder";
import UserList from "./components/admin/UserList";
import UpdateUser from "./components/admin/UpdateUser";
import ReviewList from "./components/admin/ReviewList";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { themeSettings } from "./theme";
import { useSelector } from "react-redux";
import No from "./No";
import ConfirmOrderBuyNow from "./components/cart/ConfirmOrderBuyNow";

//lazy route components
const ProductDetail = lazy(() => import("./components/product/ProductDetail"));

function App() {
  const [stripeApiKey, setStripeApiKey] = useState();
  const mode = useSelector((state) => state.themeState.mode);
  const font = useSelector((state) => state.themeState.font);

  const theme = useMemo(
    () => createTheme(themeSettings({ mode, font })),
    [mode, font]
  );

  useEffect(() => {
    store.dispatch(loadUser);
    async function getStripeApiKey() {
      const { data } = await axios.get("api/v1/stripeapi");
      setStripeApiKey(data.stripeApiKey);
    }
    getStripeApiKey();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box className="App">
          <HelmetProvider>
            <Header />
            <div className="main">
              <ToastContainer theme="dark" />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/no" element={<No />} />
                <Route path="/search/:keyword" element={<ProductSearch />} />

                <Route
                  path="/login"
                  element={
                    <GuestRoute>
                      <Login />
                    </GuestRoute>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <GuestRoute>
                      <Register />
                    </GuestRoute>
                  }
                />
                <Route
                  path="/myprofile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/myprofile/update"
                  element={
                    <ProtectedRoute>
                      <UpdateProfile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/myprofile/update/password"
                  element={
                    <ProtectedRoute>
                      <UpdatePassword />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/password/forgot"
                  element={
                    <GuestRoute>
                      <ForgotPassword />
                    </GuestRoute>
                  }
                />
                <Route
                  path="/password/reset/:token"
                  element={
                    <GuestRoute>
                      <ResetPassword />
                    </GuestRoute>
                  }
                />
                <Route path="/cart" element={<CartC />} />
                <Route
                  path="/shipping"
                  element={
                    <ProtectedRoute>
                      <Shipping />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/order/confirm"
                  element={
                    <ProtectedRoute>
                      <ConfirmOrder />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/order/confirm/buyNow"
                  element={
                    <ProtectedRoute>
                      <ConfirmOrderBuyNow />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/order/success"
                  element={
                    <ProtectedRoute>
                      <OrderSuccess />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute>
                      <UserOrder />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/order/:id"
                  element={
                    <ProtectedRoute>
                      <OrderDetail />
                    </ProtectedRoute>
                  }
                />
                {stripeApiKey && (
                  <Route
                    path="/payment"
                    element={
                      <ProtectedRoute>
                        <Elements stripe={loadStripe(stripeApiKey)}>
                          <Payment />
                        </Elements>
                      </ProtectedRoute>
                    }
                  />
                )}
              </Routes>
              <Suspense fallback={<div>...</div>}>
                <Routes>
                  <Route path="/product/:id" element={<ProductDetail />} />
                </Routes>
              </Suspense>
            </div>
            <Routes>
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute isAdmin={true}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <ProtectedRoute isAdmin={true}>
                    <ProductsList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/products/create"
                element={
                  <ProtectedRoute isAdmin={true}>
                    <NewProduct />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/product/:id"
                element={
                  <ProtectedRoute isAdmin={true}>
                    <UpdateProduct />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/order"
                element={
                  <ProtectedRoute isAdmin={true}>
                    <OrderList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/order/:id"
                element={
                  <ProtectedRoute isAdmin={true}>
                    <UpdateOrder />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute isAdmin={true}>
                    <UserList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/user/:id"
                element={
                  <ProtectedRoute isAdmin={true}>
                    <UpdateUser />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/reviews"
                element={
                  <ProtectedRoute isAdmin={true}>
                    <ReviewList />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </HelmetProvider>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
