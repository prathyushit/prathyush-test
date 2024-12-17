import SignIn from "../layouts/authentication/sign-in";
import ResetPassword from "../layouts/authentication/reset-password";
import ForgotPassword from "../layouts/authentication/forgot-password";
import HomePage from "../layouts/home";

import LoginIcon from "@mui/icons-material/Login";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SourceIcon from "@mui/icons-material/Source";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import AssessmentIcon from "@mui/icons-material/Assessment";

const routes = [
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <LoginIcon fontSize="small" />,
    route: "/sign-in",
    component: <SignIn />,
  },

  {
    type: "collapse",
    name: "Data Solutions",
    key: "solution",
    icon: <SourceIcon fontSize="small" />,
    children: [
      {
        type: "collapse",
        name: "Data Tool",
        key: "home",
        icon: <AssessmentIcon fontSize="small" />,
        route: "/home",
        component: <HomePage />,
      },
      {
        type: "collapse",
        name: "User Guide",
        key: "userguide",
        icon: <PublishedWithChangesIcon fontSize="small" />,
        route: "/userguide",
        component: <></>,
      },
    ],
  },
  {
    type: "collapse",
    name: "Forgot Password",
    key: "forgot-password",
    icon: <AssignmentIcon fontSize="small" />,
    route: "/forgot-password",
    component: <ForgotPassword />,
  },
  {
    type: "collapse",
    name: "Reset Password",
    key: "reset-password",
    icon: <LoginIcon fontSize="small" />,
    route: "/reset-password",
    component: <ResetPassword />,
  },
];

export default routes;
