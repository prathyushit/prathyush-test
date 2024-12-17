import React, { useEffect, useState } from "react";

import { useLocation, NavLink } from "react-router-dom";

import PropTypes from "prop-types";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { Collapse } from "@mui/material";

import MDBox from "../MDBox";
import MDTypography from "../MDTypography";

import SidenavCollapse from "../Sidenav/SidenavCollapse";

import SidenavRoot from "../Sidenav/SidenavRoot";
import CloseIcon from "@mui/icons-material/Close";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DataThresholdingIcon from "@mui/icons-material/DataThresholding";

import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
} from "../../context";
import { observer } from "mobx-react-lite";

const Sidenav = observer((props) => {
  const { color, brand, brandName, routes, ...rest } = props;
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } =
    controller;
  const location = useLocation();
  const collapseName = location.pathname.replace("/", "");
  // let textColor = "white";

  // if (transparentSidenav || (whiteSidenav && !darkMode)) {
  //   textColor = "dark";
  // } else if (whiteSidenav && darkMode) {
  //   textColor = "inherit";
  // }

  const closeSidenav = () => setMiniSidenav(dispatch, true);
  const [open, setOpen] = useState({});

  const handleClick = (key) => {
    setOpen({ ...open, [key]: !open[key] });
  };

  useEffect(() => {
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
      setTransparentSidenav(
        dispatch,
        window.innerWidth < 1200 ? false : transparentSidenav
      );
      setWhiteSidenav(
        dispatch,
        window.innerWidth < 1200 ? false : whiteSidenav
      );
    }

    window.addEventListener("resize", handleMiniSidenav);
    handleMiniSidenav();
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location, transparentSidenav, whiteSidenav]);

  const renderRoutes = routes.map(
    ({ name, icon, key, route, children, href }) => {
      // const isDisabled = index > pathStore.selectedStep;

      if (["sign-in", "forgot-password", "reset-password"].includes(key)) {
        return null;
      }

      if (children) {
        return (
          <React.Fragment key={key}>
            <SidenavCollapse
              name={name}
              icon={open[key] ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
              onClick={() => handleClick(key)}
            />
            <Collapse in={open[key]} timeout="auto" unmountOnExit>
              {children.map((childRoute) => {
                if (childRoute.key === "userguide") {
                  return (
                    <a
                      key={childRoute.key}
                      href="https://react.dev/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SidenavCollapse
                        name={childRoute.name}
                        icon={childRoute.icon}
                        subItem={true}
                      />
                    </a>
                  );
                } else {
                  return (
                    <NavLink key={childRoute.key} to={childRoute.route}>
                      <SidenavCollapse
                        name={childRoute.name}
                        icon={childRoute.icon}
                        subItem={true}
                        active={childRoute.key === collapseName}
                      />
                    </NavLink>
                  );
                }
              })}
            </Collapse>
          </React.Fragment>
        );
      } else {
        return (
          <NavLink key={key} to={route}>
            <SidenavCollapse
              name={name}
              icon={icon}
              active={key === collapseName}
            />
          </NavLink>
        );
      }
    }
  );

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <MDBox pt={3} pb={1} px={4} textAlign="center">
        <MDBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <MDTypography variant="h6" color="secondary">
            <CloseIcon fontSize="small" color="white" />
          </MDTypography>
        </MDBox>
        <MDBox
          component={NavLink}
          to="/"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {brand && (
            <MDBox
              sx={{
                background: "white",
                padding: "8px",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MDBox component="img" src={brand} alt="Brand" width="2rem" />
            </MDBox>
          )}
        </MDBox>
      </MDBox>
      <Divider
        light={
          (!darkMode && !whiteSidenav && !transparentSidenav) ||
          (darkMode && !transparentSidenav && whiteSidenav)
        }
      />
      <MDBox
        sx={{
          display: "flex",
          gap: "10px",
          marginLeft: "30px",
          marginBottom: "10px",
        }}
      >
        <DataThresholdingIcon color="white" />
        <MDTypography variant="h6" fontWeight="medium" color="white">
          Home
        </MDTypography>
      </MDBox>
      <List>{renderRoutes}</List>
      <MDBox
        sx={{
          display: "flex",
          gap: "10px",
          marginLeft: "30px",
          marginTop: "20px",
        }}
      >
        <MDTypography
          variant="button"
          fontWeight="light"
          color="white"
          sx={{ cursor: "pointer" }}
          onClick={() =>
            window.open(
              "https://app.visily.ai/projects/155f71b8-90a2-4e8b-b7cf-332249fde39f/boards/822727/presenter?play-mode=Prototype",
              "_blank"
            )
          }
        >
          Hyperlink to external sites
        </MDTypography>
      </MDBox>
    </SidenavRoot>
  );
});

Sidenav.defaultProps = {
  color: "info",
  brand: "",
};

Sidenav.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
