import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Card from "@mui/material/Card";

import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import MDButton from "../../../components/MDButton";
import LogoImage from "../../../assets/images/logo.png";
import BasicLayout from "../../../components/LayoutContainers/BasicLayout";
import { useStores } from "../../../store";

import { observer } from "mobx-react-lite";
import {
  CircularProgress,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const ForgotPassword = observer(() => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { authStore } = useStores();

  const onSendEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await authStore.forgotPassword(email);
      console.log("response ===>", response);
      if (response) {
        navigate("/reset-password", { replace: true });
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
            Forgot Password
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={12} mt={4}>
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

            <MDBox mt={4} mb={1}>
              <MDButton color="mainButton" fullWidth onClick={onSendEmail}>
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

export default ForgotPassword;
