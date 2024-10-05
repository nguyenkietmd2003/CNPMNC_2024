// src/router.jsx
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/homepage/Homepage"; // Đảm bảo tên file và đường dẫn đúng
import ErrorPage from "./pages/errorpage/ErrorPage"; // Đảm bảo tên file và đường dẫn đúng
import LoginPage from "./pages/loginPage/loginpage";
import RegisterPage from "./pages/registerPage/registerPage";
import SearchComponent from "./components/Search/search";

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
    element: <App />,
    children: [{ path: "products", element: <h2>Children products</h2> }],
  },
  // Route lỗi
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
