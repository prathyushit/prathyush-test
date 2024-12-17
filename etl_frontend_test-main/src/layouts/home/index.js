import { useEffect, useState } from "react";
import DashboardLayout from "../../components/LayoutContainers/DashboardLayout";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import MDButton from "../../components/MDButton";
import DashboardNavbar from "../../components/DashboardNavbar";
import BucketSelector from "./components/bucketSelector";
import DataInfoList from "./components/dataList";

import { Card, CircularProgress } from "@mui/material";

import { observer } from "mobx-react-lite";
import { useStores } from "../../store";
import { useMediaQuery, useTheme } from "@mui/material";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const commonStyles = {
  accordion: {
    // border: "1px solid #340CB9",
    borderRadius: "5px",
    marginBottom: "5px",
  },
  accordionSummary: {
    height: "40px",
    minHeight: "40px",
  },
  mdBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  roundBox: {
    width: 25,
    height: 25,
    borderRadius: "50%",
    backgroundColor: "transparent",
    border: "1px solid grey",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

const HomePage = observer(() => {
  const { dataStore } = useStores();

  const [selectedBucket, setSelectedBucket] = useState(
    dataStore.selectedBucket
  );

  const [expandedAccordion, setExpandedAccordion] = useState("");
  const [finish, setFinish] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    dataStore.getBuckets();
  }, [dataStore]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDTypography variant="h5" fontWeight="medium" color="dark" mt={2} mb={2}>
        Job Details
      </MDTypography>
      <MDBox sx={{ display: "flex", flexDirection: "column", marginTop: 0 }}>
        {dataStore.isLoading ? (
          <MDBox
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "50vh",
            }}
          >
            <CircularProgress color="info" />
          </MDBox>
        ) : (
          <Card
            sx={{
              padding: 6,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Accordion
                style={{
                  ...commonStyles.accordion,
                  border:
                    dataStore.step >= 0
                      ? "1px solid #340CB9"
                      : "1px solid #d8d8d8",
                  marginBottom: "20px",
                }}
                expanded={expandedAccordion === "accordion1"}
                onChange={() =>
                  setExpandedAccordion(
                    expandedAccordion === "accordion1" ? "" : "accordion1"
                  )
                }
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`1-content`}
                  id={`1-header`}
                  style={commonStyles.accordionSummary}
                >
                  <MDBox sx={{ ...commonStyles.mdBox, gap: `120px` }}>
                    <MDBox sx={{ ...commonStyles.mdBox, gap: "10px" }}>
                      <Box
                        sx={{
                          width: 25,
                          height: 25,
                          borderRadius: "50%",
                          backgroundColor:
                            dataStore.selectedBucket === ""
                              ? "transparent"
                              : "#17A948",
                          border:
                            dataStore.selectedBucket === ""
                              ? "1px solid grey"
                              : "1px solid #17A948",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <MDTypography
                          variant="button"
                          fontWeight="light"
                          color={
                            dataStore.selectedBucket === "" ? "dark" : "white"
                          }
                        >
                          1
                        </MDTypography>
                      </Box>
                      <MDTypography
                        variant="button"
                        fontWeight="light"
                        color="dark"
                      >
                        Select
                      </MDTypography>
                    </MDBox>
                    {matches && (
                      <MDTypography
                        variant="button"
                        fontWeight="light"
                        color="dark"
                      >
                        {dataStore.selectedBucket === ""
                          ? "Specify S3 Bucket path to get started with validation and conversion stage"
                          : dataStore.selectedBucket}
                      </MDTypography>
                    )}
                  </MDBox>
                </AccordionSummary>
                <AccordionDetails
                  style={{
                    minHeight: "200px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <MDBox
                    sx={{
                      marginTop: "20px",
                    }}
                  >
                    <BucketSelector
                      dataStore={dataStore}
                      selectedBucket={selectedBucket}
                      setSelectedBucket={setSelectedBucket}
                    />
                  </MDBox>
                  <MDButton
                    variant="gradient"
                    color="success"
                    sx={{
                      width: 100,
                      ml: 5,
                      mr: 5,
                      alignSelf: "flex-end",
                      borderRadius: 10,
                    }}
                    disabled={dataStore.selectedBucket === ""}
                    onClick={() => {
                      setExpandedAccordion("accordion2");
                      dataStore.changeStep(1);
                    }}
                  >
                    Save
                  </MDButton>
                </AccordionDetails>
              </Accordion>

              <Accordion
                style={{
                  ...commonStyles.accordion,
                  border:
                    dataStore.step >= 1
                      ? "1px solid #340CB9"
                      : "1px solid #d8d8d8",
                  marginBottom: "20px",
                }}
                expanded={expandedAccordion === "accordion2"}
                onChange={() =>
                  setExpandedAccordion(
                    expandedAccordion === "accordion2" ? "" : "accordion2"
                  )
                }
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`2-content`}
                  id={`2-header`}
                  style={commonStyles.accordionSummary}
                >
                  <MDBox sx={{ ...commonStyles.mdBox, gap: `98px` }}>
                    <MDBox sx={{ ...commonStyles.mdBox, gap: "10px" }}>
                      <Box
                        sx={{
                          width: 25,
                          height: 25,
                          borderRadius: "50%",
                          backgroundColor: !dataStore.validated
                            ? "transparent"
                            : "#17A948",
                          border: !dataStore.validated
                            ? "1px solid grey"
                            : "1px solid #17A948",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <MDTypography
                          variant="button"
                          fontWeight="light"
                          color={!dataStore.validated ? "dark" : "white"}
                        >
                          2
                        </MDTypography>
                      </Box>
                      <MDTypography
                        variant="button"
                        fontWeight="light"
                        color="dark"
                      >
                        Validation
                      </MDTypography>
                    </MDBox>
                    {matches && (
                      <MDTypography
                        variant="button"
                        fontWeight="light"
                        color="dark"
                      >
                        Validate the files present in selected s3 bucket
                      </MDTypography>
                    )}
                  </MDBox>
                </AccordionSummary>
                <AccordionDetails
                  style={{
                    minHeight: "200px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <MDButton
                    variant="gradient"
                    color="success"
                    sx={{
                      width: 100,
                      ml: 5,
                      mr: 5,
                      borderRadius: 10,
                    }}
                    onClick={() => {
                      dataStore.validateFiles();
                    }}
                    disabled={
                      dataStore.selectedBucket === "" || dataStore.step < 1
                    }
                  >
                    Validate
                  </MDButton>
                  <DataInfoList
                    dataInfo={dataStore.validateStatusMsg}
                    loading={dataStore.isValidateLoading}
                  />
                </AccordionDetails>
              </Accordion>

              <Accordion
                style={{
                  ...commonStyles.accordion,
                  border:
                    dataStore.step >= 2
                      ? "1px solid #340CB9"
                      : "1px solid #d8d8d8",
                }}
                expanded={expandedAccordion === "accordion3"}
                onChange={() =>
                  setExpandedAccordion(
                    expandedAccordion === "accordion3" ? "" : "accordion3"
                  )
                }
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`3-content`}
                  id={`3-header`}
                  style={commonStyles.accordionSummary}
                >
                  <MDBox sx={{ ...commonStyles.mdBox, gap: `89px` }}>
                    <MDBox sx={{ ...commonStyles.mdBox, gap: "10px" }}>
                      <Box
                        sx={{
                          width: 25,
                          height: 25,
                          borderRadius: "50%",
                          backgroundColor: !dataStore.converted
                            ? "transparent"
                            : "#17A948",
                          border: !dataStore.converted
                            ? "1px solid grey"
                            : "1px solid #17A948",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <MDTypography
                          variant="button"
                          fontWeight="light"
                          color={!dataStore.converted ? "dark" : "white"}
                        >
                          3
                        </MDTypography>
                      </Box>
                      <MDTypography
                        variant="button"
                        fontWeight="light"
                        color="dark"
                      >
                        Conversion
                      </MDTypography>
                    </MDBox>
                    {matches && (
                      <MDTypography
                        variant="button"
                        fontWeight="light"
                        color="dark"
                      >
                        Convert your validated files and download them
                      </MDTypography>
                    )}
                  </MDBox>
                </AccordionSummary>
                <AccordionDetails
                  style={{
                    minHeight: "200px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <MDButton
                    variant="gradient"
                    color="success"
                    sx={{
                      width: 100,
                      ml: 5,
                      mr: 5,
                      borderRadius: 10,
                    }}
                    disabled={
                      dataStore.selectedBucket === "" || dataStore.step < 2
                    }
                    onClick={() => {
                      dataStore.transformFiles();
                    }}
                  >
                    Convert
                  </MDButton>
                  <DataInfoList
                    dataInfo={dataStore.convertStatusMsg}
                    loading={dataStore.isTransformLoading}
                  />
                  {dataStore.step >= 3 ? (
                    <MDButton
                      variant="gradient"
                      color="success"
                      sx={{
                        ml: 5,
                        mr: 5,
                        mt: 5,
                        width: 250,
                        borderRadius: 10,
                      }}
                      disabled={
                        dataStore.selectedBucket === "" || dataStore.step < 3
                      }
                      onClick={() => {
                        dataStore.changeStep(4);
                        setExpandedAccordion("");
                        setFinish(true);
                      }}
                    >
                      Download Converted files
                    </MDButton>
                  ) : (
                    <></>
                  )}
                </AccordionDetails>
              </Accordion>
              {dataStore.step === 4 && finish && (
                <Box
                  sx={{
                    bgcolor: "background.paper",
                    boxShadow: 6,
                    borderRadius: 1,

                    mx: "auto",
                    my: 2,
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "#B8F5CD",
                    }}
                  >
                    <CheckCircleOutlineIcon
                      sx={{
                        color: "#17A948",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexGrow: 1,
                    }}
                  >
                    <Box
                      sx={{ display: "flex", flexDirection: "column", ml: 1 }}
                    >
                      <MDTypography
                        variant="h6"
                        fontWeight="medium"
                        sx={{ mb: 2, mt: 2 }}
                      >
                        Success
                      </MDTypography>
                      <MDTypography variant="button" sx={{ mb: 2 }}>
                        Process Successfully Completed. You may exit now or
                        begin a new conversation.
                      </MDTypography>
                      <Box sx={{ display: "flex", mt: 2, mb: 2 }}>
                        <MDButton
                          variant="gradient"
                          color="error"
                          sx={{ width: 150, mr: 5, borderRadius: 10 }}
                          onClick={() => {
                            setFinish(false);
                          }}
                        >
                          Exit
                        </MDButton>
                        <MDButton
                          variant="gradient"
                          color="mainButton"
                          sx={{ width: 150, ml: 5, mr: 5, borderRadius: 10 }}
                          onClick={() => {
                            setFinish(false);
                            dataStore.resetState();
                          }}
                        >
                          Start New
                        </MDButton>
                      </Box>
                    </Box>
                    <CloseIcon
                      sx={{ mt: 1, mr: 1, cursor: "pointer" }}
                      onClick={() => {
                        console.log("hello");
                        setFinish(false);
                      }}
                    />
                  </Box>
                </Box>
              )}
            </Box>
          </Card>
        )}
      </MDBox>
    </DashboardLayout>
  );
});

export default HomePage;
