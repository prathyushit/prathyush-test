import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";

import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import MDButton from "../../../components/MDButton";
import InputAdornment from "@mui/material/InputAdornment";
import BasicLayout from "../../../components/LayoutContainers/BasicLayout";

import LogoImage from "../../../assets/images/logo.png";
import { observer } from "mobx-react-lite";
import { useStores } from "../../../store";
import {
  CircularProgress,
  FormControl,
  OutlinedInput,
  InputLabel,
} from "@mui/material";
import { useAuth } from "../../../context/auth_provider";

import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { CheckBox } from "@mui/icons-material";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const SignIn = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const { authStore } = useStores();

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await authStore.login({ email, password });
      if (response) {
        navigate("/home", { replace: true });
      }
    } catch (error) {
      console.error("Failed to login", error);
    }
  };

  return (
    <BasicLayout image="">
      <MDBox
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
        mb={5}
      >
        <img
          src={LogoImage}
          alt="Logo"
          style={{ height: "50px", width: "auto" }}
        />
        <MDTypography variant="h2" fontWeight="medium" color="dark">
          DataLoad
        </MDTypography>
      </MDBox>
      <Card>
        <MDBox mx={2} mt={-3} p={2} textAlign="center">
          <MDTypography variant="h4" fontWeight="medium" color="dark" mt={5}>
            Sign In
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel
                  htmlFor="outlined-adornment-email"
                  shrink
                  sx={{
                    position: "absolute",
                    transform: "translate(0, -0.8em)",
                    fontSize: "0.8rem !important",
                  }}
                >
                  Email
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    authStore.clearError();
                  }}
                  placeholder="Enter your email"
                  startAdornment={
                    <InputAdornment position="start">
                      <EmailOutlinedIcon
                        sx={{ fontSize: "1.1rem !important" }}
                      />
                    </InputAdornment>
                  }
                  sx={{
                    marginTop: "0.8em",
                  }}
                />
              </FormControl>
            </MDBox>
            <MDBox mb={2} mt={4}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel
                  htmlFor="outlined-adornment-password"
                  shrink
                  sx={{
                    position: "absolute",
                    transform: "translate(0, -0.8em)",
                    fontSize: "0.8rem !important",
                  }}
                >
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    authStore.clearError();
                  }}
                  placeholder="Enter your password"
                  startAdornment={
                    <InputAdornment position="start">
                      <LockOpenOutlinedIcon
                        sx={{ fontSize: "1.1rem !important" }}
                      />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  sx={{
                    marginTop: "1.0em",
                  }}
                />
              </FormControl>
            </MDBox>
            <MDBox
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mt={3}
              mb={5}
            >
              <MDBox display="flex" alignItems="center">
                <CheckBox
                  checked={rememberMe}
                  onChange={handleSetRememberMe}
                  color="mainButton"
                />
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  onClick={handleSetRememberMe}
                  sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                >
                  &nbsp;&nbsp;Remember me
                </MDTypography>
              </MDBox>
              <MDBox textAlign="center">
                <MDTypography variant="button" color="text">
                  <MDTypography
                    component={Link}
                    to="/forgot-password"
                    variant="button"
                    color="mainButton"
                    fontWeight="medium"
                    textGradient
                  >
                    Forgot password?
                  </MDTypography>
                </MDTypography>
              </MDBox>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton color="mainButton" fullWidth onClick={handleLogin}>
                {!authStore.isLoading && <div>sign in</div>}
                {authStore.isLoading && (
                  <CircularProgress color="white" size={20} />
                )}
              </MDButton>
            </MDBox>
            {authStore.errorMsg && (
              <MDBox textAlign="center">
                <MDTypography variant="caption" color="error">
                  {authStore.errorMsg}
                </MDTypography>
              </MDBox>
            )}
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
});

export default SignIn;
