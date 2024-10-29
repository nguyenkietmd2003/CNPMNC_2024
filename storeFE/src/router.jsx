// src/router.jsx
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/homepage/Homepage"; // Đảm bảo tên file và đường dẫn đúng
import ErrorPage from "./pages/errorpage/ErrorPage"; // Đảm bảo tên file và đường dẫn đúng
import LoginPage from "./pages/loginPage/loginpage";
import RegisterPage from "./pages/registerPage/registerPage";
import SearchComponent from "./components/Search/search";
import AdminPage from "./pages/admin/admin";
import DetailPage from "./pages/detailpage/detailpage";
import PhoneDetailPage from "./pages/detailpage/detailPage1";
import CartPage from "./pages/cartpage/CartPage";
import ListProduct from "./pages/listProduct/listProduct";
import ForgotPasswordPage from "./pages/forgotPasswordPage/forgotPasswordPage";
import VerifyCodePage from "./pages/forgotPasswordPage/verifyCode";
import ResetPasswordPage from "./pages/forgotPasswordPage/resetPassword";
import ProductManagerPage from "./pages/admin/productManager";
import UserManagerPage from "./pages/admin/UserManager";
import AccountPage from "./pages/account/account";
import ProtectedRoute from "./util/protectedRoute.jsx";

export const router = createBrowserRouter([
  // user routes
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
  // admin routes
  {
    path: "/admin",
    element: <AdminPage />,
    children: [
      <ProtectedRoute key="products" requiredRole="admin">
        <ProductManagerPage />
      </ProtectedRoute>,
      <ProtectedRoute key="users" requiredRole="admin">
        <UserManagerPage />
      </ProtectedRoute>,
      {
        index: true,
        element: (
          <ProtectedRoute requiredRole="admin">
            <UserManagerPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  // Route lỗi
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
