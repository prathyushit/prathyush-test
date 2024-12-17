import React from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";

const commonStyles = {
  accordion: {
    border: "1px solid #340CB9",
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

const AccordionItem = ({ id, header, description, gap, children }) => (
  <Accordion style={commonStyles.accordion}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls={`${id}-content`}
      id={`${id}-header`}
      style={commonStyles.accordionSummary}
    >
      <MDBox sx={{ ...commonStyles.mdBox, gap: `${gap}px` }}>
        <MDBox sx={{ ...commonStyles.mdBox, gap: "10px" }}>
          <Box sx={commonStyles.roundBox}>
            <MDTypography variant="button" fontWeight="light" color="dark">
              {id}
            </MDTypography>
          </Box>
          <MDTypography variant="button" fontWeight="light" color="dark">
            {header}
          </MDTypography>
        </MDBox>
        <MDTypography variant="button" fontWeight="light" color="dark">
          {description}
        </MDTypography>
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
      {children}
    </AccordionDetails>
  </Accordion>
);

export default AccordionItem;
