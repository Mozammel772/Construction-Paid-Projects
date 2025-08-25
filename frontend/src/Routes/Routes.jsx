import { createBrowserRouter } from "react-router-dom";
import ForgotPassword from "../Authentication/ForgotPassword";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import ErrorPage from "../ErrorPage/ErrorPage";
import AdminLayout from "../layout/AdminLayout";
import MainLayout from "../layout/MainLayout";
import UserLayout from "../layout/UserLayout";
import AdminGenerateToken from "../Pages/AdminDashboardPages/AdminGenerateToken/AdminGenerateToken";
import AdminQuotes from "../Pages/AdminDashboardPages/AdminQuotes/AdminQuotes";
import Reviews from "../Pages/AdminDashboardPages/allReviwsAdmin/Reviews";
import ReviewsDetails from "../Pages/AdminDashboardPages/allReviwsAdmin/ReviewsDetails";
import ReviwsEdit from "../Pages/AdminDashboardPages/allReviwsAdmin/ReviwsEdit";
import AllUsers from "../Pages/AdminDashboardPages/AllUsers/AllUsers";
import BeforeAfterImage from "../Pages/AdminDashboardPages/BeforeAfterImage/BeforeAfterImage";
import ImageTextSlider from "../Pages/AdminDashboardPages/ImageTextSlider/ImageTextSlider";
import AdminOnSiteVisits from "../Pages/AdminDashboardPages/OnSiteVisits/OnSiteVisits";
import PendingEditPost from "../Pages/AdminDashboardPages/PendingPostPages/PendingEditPost";
import PendingPost from "../Pages/AdminDashboardPages/PendingPostPages/PendingPost";
import PendingPostDetails from "../Pages/AdminDashboardPages/PendingPostPages/PendingPostDetails";
import CookiesPolicy from "../Pages/FooterPages/CookiesPolicy";
import PrivacyPolicy from "../Pages/FooterPages/PrivacyPolicy";
import TermsAndConditions from "../Pages/FooterPages/TermsAndConditions";
import Home from "../Pages/HomePages/Home";
import Profilio from "../Pages/ProfilioPages/Profilio";
import ProfilioDetails from "../Pages/ProfilioPages/ProfilioDetails";
import DashboardRedirect from "../Pages/UserDashboardPages/DashboardRedirect";
import EditMyPostHistory from "../Pages/UserDashboardPages/EditMyPostHistory";
import MyPostHistory from "../Pages/UserDashboardPages/MyPostHistory";
import MyPostHistoryDetails from "../Pages/UserDashboardPages/MyPostHistoryDetails";
import OnSiteVisit from "../Pages/UserDashboardPages/OnSiteVisit";
import Profile from "../Pages/UserDashboardPages/Profile";
import Reviwes from "../Pages/UserDashboardPages/Reviwes";
import UserDashboard from "../Pages/UserDashboardPages/UserDashboard";
import Quote from "../Pages/UserQuotePages/Quote";
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
        path: "/cookies-policy",
        element: <CookiesPolicy />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-and-conditions",
        element: <TermsAndConditions />,
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
        element: <PendingPost />,
      },

      {
        path: "post-management/pending-all-post-details/:id",
        element: <PendingPostDetails />,
      },
      {
        path: "post-management/pending-all-post-edit/:id",
        element: <PendingEditPost />,
      },
      {
        path: "manage-users/all-users",
        element: <AllUsers />,
      },
      {
        path: "request-a-quote",
        element: <AdminQuotes />,
      },
      {
        path: "on-site-visits",
        element: <AdminOnSiteVisits />,
      },
      {
        path: "create-token",
        element: <AdminGenerateToken />,
      },
      {
        path: "reviws",
        element: <Reviews />,
      },
      {
        path: "reviws-details/:id",
        element: <ReviewsDetails />,
      },
      {
        path: "reviws-edit/:id",
        element: <ReviwsEdit />,
      },
      {
        path: "before-after-image-upload",
        element: <BeforeAfterImage />,
      },
      {
        path: "image-text-slider",
        element: <ImageTextSlider/>
      },
      {
        path: "*",
        element: <ErrorPage />,
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
        path: "my-post-history-details/edit/:id",
        element: <EditMyPostHistory />,
      },
      {
        path: "create-a-quote-requsted",
        element: <Quote />,
      },
      {
        path: "on-site-visit",
        element: <OnSiteVisit />,
      },
      {
        path: "my-post-history-details/edit/:id",
        element: <Profile />,
      },
      {
        path: "review",
        element: <Reviwes />,
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
