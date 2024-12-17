import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";

import MDButton from "../../../components/MDButton";
import { useState } from "react";
import { useStores } from "../../../store";
import BasicLayout from "../../../components/LayoutContainers/BasicLayout";
import LogoImage from "../../../assets/images/logo.png";
import { observer } from "mobx-react-lite";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IntegrationInstructionsOutlinedIcon from "@mui/icons-material/IntegrationInstructionsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import {
  CircularProgress,
  FormControl,
  OutlinedInput,
  IconButton,
  InputLabel,
  InputAdornment,
} from "@mui/material";

const ResetPassword = observer(() => {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { authStore } = useStores();

  const onResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await authStore.resetPassword({ code, password });
      console.log("response ===>", response);
      if (response) {
        navigate("/", { replace: true });
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
            Reset Password
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2} mt={4}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel
                  htmlFor="outlined-adornment-code"
                  shrink
                  sx={{
                    position: "absolute",
                    transform: "translate(0, -0.8em)",
                    fontSize: "0.8rem !important",
                  }}
                >
                  Code
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-code"
                  type="number"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    authStore.clearError();
                  }}
                  placeholder="Enter your code"
                  startAdornment={
                    <InputAdornment position="start">
                      <IntegrationInstructionsOutlinedIcon
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
            <MDBox mb={8}>
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
                  placeholder="Enter new password"
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

            <MDBox mt={4} mb={1}>
              <MDButton color="mainButton" fullWidth onClick={onResetPassword}>
                {!authStore.isLoading && <div>Submit</div>}
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

export default ResetPassword;
