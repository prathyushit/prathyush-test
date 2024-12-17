import React from "react";
import { observer } from "mobx-react-lite";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const FormatSelector = observer(({ formatValue, changeFormatValue }) => {
  return (
    <MDBox
      sx={{
        display: "flex",
        alignItems: "start",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <MDTypography variant="h6">Select Formats</MDTypography>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={formatValue}
          onChange={changeFormatValue}
        >
          <FormControlLabel
            value="FHIR XML Format"
            control={<Radio />}
            label="FHIR XML Format"
          />
          <FormControlLabel
            value="FHIR JSON Format"
            control={<Radio />}
            label="FHIR JSON Format"
          />
          <FormControlLabel
            value="CSV Format"
            control={<Radio />}
            label="CSV Format"
          />
        </RadioGroup>
      </FormControl>
    </MDBox>
  );
});

export default FormatSelector;
