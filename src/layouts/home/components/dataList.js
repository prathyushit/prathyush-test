import React, { useState, useEffect } from "react";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import { Card, CircularProgress } from "@mui/material";

const DataInfoList = ({ dataInfo, loading }) => {
  const [contentAlignment, setContentAlignment] = useState("center");

  useEffect(() => {
    if (loading || typeof dataInfo === "string" || !dataInfo) {
      setContentAlignment("center");
    } else if (
      typeof dataInfo === "object" &&
      dataInfo !== null &&
      !Array.isArray(dataInfo)
    ) {
      setContentAlignment("start");
    }
  }, [dataInfo, loading]);

  const renderContent = () => {
    if (loading) {
      return <CircularProgress color="info" />;
    } else if (dataInfo) {
      if (
        typeof dataInfo === "object" &&
        dataInfo !== null &&
        !Array.isArray(dataInfo)
      ) {
        return Object.entries(dataInfo).map(([label, value], key) => (
          <MDBox key={key} display="flex" py={1} pr={2}>
            <MDTypography
              variant="button"
              fontWeight="bold"
              textTransform="capitalize"
            >
              {label}: &nbsp;
            </MDTypography>
            <MDTypography variant="button" fontWeight="regular" color="text">
              &nbsp;{value}
            </MDTypography>
          </MDBox>
        ));
      } else if (typeof dataInfo === "string") {
        return (
          <MDTypography variant="button" fontWeight="regular" color="text">
            {dataInfo}
          </MDTypography>
        );
      }
    }

    return (
      <MDTypography variant="button" fontWeight="regular" color="text">
        No status
      </MDTypography>
    );
  };

  return (
    <MDBox
      sx={{ gap: 1, display: "flex", marginTop: 3, flexDirection: "column" }}
    >
      <Card
        sx={{
          padding: 2,
          minHeight: 250,
          display: "flex",
          flexDirection: "column",
          alignItems: contentAlignment,
          justifyContent: "center",
        }}
      >
        {renderContent()}
      </Card>
    </MDBox>
  );
};

export default DataInfoList;
