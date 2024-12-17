import { useState, useEffect } from "react";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Sidenav from "./components/Sidenav";
import Configurator from "./components/Configurator";
import theme from "./assets/theme";
import { CircularProgress, Box } from "@mui/material";
import routes from "./router";
import { ProtectedRoute } from "./router/protect_route";
import { useAuth } from "./context/auth_provider";

import { useMaterialUIController, setMiniSidenav } from "./context";

import brandWhite from "./assets/images/logo.png";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, direction, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [layout, setLayout] = useState("page");

  const { pathname } = useLocation();

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  useEffect(() => {
    const pageLayoutRoutes = [
      "/",
      "/sign-in",
      "/forgot-password",
      "/reset-password",
    ];
    const currentLayout = pageLayoutRoutes.includes(pathname)
      ? "page"
      : "dashboard";
    setLayout(currentLayout);
  }, [pathname]);

  const { isAuthenticated, initializing } = useAuth();

  const renderRoutes = (allRoutes) =>
    allRoutes.flatMap((route) => {
      const isProtected = ![
        "/sign-in",
        "/forgot-password",
        "/reset-password",
      ].includes(route.route);

      if (isProtected) {
        if (route.children) {
          return route.children.map((child) => (
            <Route
              key={child.key}
              path={child.route}
              element={<ProtectedRoute>{child.component}</ProtectedRoute>}
            />
          ));
        } else {
          return (
            <Route
              key={route.key}
              path={route.route}
              element={<ProtectedRoute>{route.component}</ProtectedRoute>}
            />
          );
        }
      } else {
        return (
          <Route key={route.key} path={route.route} element={route.component} />
        );
      }
    });

  if (initializing) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={brandWhite}
            brandName=""
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        {renderRoutes(routes)}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/sign-in" replace />
            )
          }
        />
      </Routes>
    </ThemeProvider>
  );
}
