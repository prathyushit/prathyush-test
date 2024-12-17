import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";

import MDBox from "../MDBox";
import MDTypography from "../MDTypography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import NotificationItem from "../NotificationItem";
import { useAuth } from "../../context/auth_provider";

import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "./styles";

import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
} from "../../context";
import { getItemFromLS } from "../../config/storage";

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();

  const { transparentNavbar, fixedNavbar, miniSidenav, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  // const route = useLocation().pathname.split("/").slice(1);
  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);

  const navigate = useNavigate();

  const username = getItemFromLS("email");

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/sign-in", { replace: true });
  };

  useEffect(() => {
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    function handleTransparentNavbar() {
      setTransparentNavbar(
        dispatch,
        (fixedNavbar && window.scrollY === 0) || !fixedNavbar
      );
    }

    window.addEventListener("scroll", handleTransparentNavbar);

    handleTransparentNavbar();

    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem
        icon={<LogoutIcon />}
        title="Log out"
        onClick={handleLogout}
      />
    </Menu>
  );

  const iconsStyle = ({
    palette: { dark, white, text },
    functions: { rgba },
  }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      sx={(theme) =>
        navbar(theme, { transparentNavbar, absolute, light, darkMode })
      }
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox
          color="inherit"
          mb={{ xs: 1, md: 0 }}
          sx={(theme) => navbarRow(theme, { isMini })}
        >
          {/* <Breadcrumbs
            icon={<HomeIcon />}
            title={route[route.length - 1]}
            route={route}
            light={light}
          /> */}
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox color={light ? "white" : "inherit"}>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                {miniSidenav ? (
                  <MenuIcon sx={iconsStyle} fontSize="medium" />
                ) : (
                  <MenuOpenIcon sx={iconsStyle} fontSize="medium" />
                )}
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                {" "}
                <MDTypography variant="button" fontWeight="light" color="dark">
                  {username}
                </MDTypography>
                <KeyboardArrowDownIcon sx={iconsStyle} />
              </IconButton>
              {renderMenu()}
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
