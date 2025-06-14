import { createBrowserRouter } from "react-router-dom";
import ChangePassword from "../Authentication/ChangePassword";
import ForgotPassword from "../Authentication/ForgotPassword";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import ErrorPage from "../ErrorPage/ErrorPage";
import AdminLayout from "../layout/AdminLayout";
import MainLayout from "../layout/MainLayout";
import UserLayout from "../layout/UserLayout";
import About from "../Pages/AboutPages/About";
import AdminDashboard from "../Pages/AdminDashboard/AdminDashboard";
import AllUsers from "../Pages/AdminDashboardPages/AllUsers/AllUsers";
import BlogAdmin from "../Pages/AdminDashboardPages/BlogPages/BlogAdmin";
import BlogHistory from "../Pages/AdminDashboardPages/BlogPages/BlogHistory";
import EditBlog from "../Pages/AdminDashboardPages/BlogPages/EditBlog";
import PendingEditPost from "../Pages/AdminDashboardPages/PendingPostPages/PendingEditPost";
import PendingPost from "../Pages/AdminDashboardPages/PendingPostPages/PendingPost";
import PendingPostDetails from "../Pages/AdminDashboardPages/PendingPostPages/PendingPostDetails";
import Blog from "../Pages/BlogPages/Blog";
import BlogDetails from "../Pages/BlogPages/BlogDetails";
import Contact from "../Pages/FooterPages/Contact";
import PrivacyPolicy from "../Pages/FooterPages/PrivacyPolicy";
import RefundPolicy from "../Pages/FooterPages/RefundPolicy";
import TermsAndConditions from "../Pages/FooterPages/TermsAndConditions";
import Home from "../Pages/HomePages/Home";
import Profile from "../Pages/ProfilePages/Profile";
import Profilio from "../Pages/ProfilioPages/Profilio";
import ProfilioDetails from "../Pages/ProfilioPages/ProfilioDetails";
import DashboardRedirect from "../Pages/UserDashboardPages/DashboardRedirect";
import MyPostHistory from "../Pages/UserDashboardPages/MyPostHistory";
import MyPostHistoryDetails from "../Pages/UserDashboardPages/MyPostHistoryDetails";
import UserDashboard from "../Pages/UserDashboardPages/UserDashboard";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import UserRoute from "./UserRouter";
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/portfolio",
        element: <Profilio />,
      },
      {
        path: "/portfolio-details/:id",
        element: <ProfilioDetails />,
      },
      {
        path: "/about-us-more-information",
        element: <About />,
      },

      // Blog
      {
        path: "/blog-us",
        element: <Blog />,
      },
      {
        path: "/blog-us/:id",
        element: <BlogDetails />,
      },
      // Authentication
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },

      // footer
      {
        path: "/contact-us",
        element: <Contact />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-and-conditions",
        element: <TermsAndConditions />,
      },
      {
        path: "/refund-policy",
        element: <RefundPolicy />,
      },
    ],
  },
  // Admin Dashboard
  {
    path: "admin-dashboard",
    element: (
      <PrivateRoute>
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "post-management/pending-all-post",
        element: <PendingPost />,
      },
      {
        path: "/admin-dashboard/post-management/pending-all-post-details/:id",
        element: <PendingPostDetails />,
      },
      {
        path: "/admin-dashboard/post-management/pending-all-post-edit/:id",
        element: <PendingEditPost />,
      },
      {
        path: "manage-users/all-users",
        element: <AllUsers />,
      },

      // Admin Blog Routes
      {
        path: "create-a-new-blog",
        element: <BlogAdmin />,
      },
      {
        path: "blog-history",
        element: <BlogHistory />,
      },
      {
        path: "edit-blog/:id",
        element: <EditBlog />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
      // Admin Profile oo Password Change
      {
        path: "my-profile",
        element: <Profile />,
      },
      {
        path: "change-password",
        element: <ChangePassword />,
      },
    ],
  },
  // User Dashboard
  {
    path: "user-dashboard",
    element: (
      <PrivateRoute>
        <UserRoute>
          <UserLayout />
        </UserRoute>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <UserDashboard />,
      },
      {
        path: "my-post-history",
        element: <MyPostHistory />,
      },
      {
        path: "my-post-history-details/:id",
        element: <MyPostHistoryDetails />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardRedirect />
      </PrivateRoute>
    ),
  },
]);
