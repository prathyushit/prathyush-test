import React from "react";
import { observer } from "mobx-react-lite";
import MDBox from "../../../components/MDBox";
import { FormControl, Select, MenuItem } from "@mui/material";

const BucketSelector = observer(
  ({ dataStore, selectedBucket, setSelectedBucket }) => {
    return (
      <MDBox
        sx={{
          display: "flex",
          alignItems: "start",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <FormControl>
          <Select
            labelId="bucket-select-label"
            id="bucket-select"
            value={selectedBucket}
            label="Bucket"
            sx={{
              marginTop: 1.5,
              minWidth: 450,
            }}
            onChange={(e) => {
              setSelectedBucket(e.target.value);
              dataStore.changeBucket(e.target.value);
            }}
          >
            {dataStore.buckets.map((bucket, index) => (
              <MenuItem key={index} value={bucket.Name}>
                {bucket.Name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </MDBox>
    );
  }
);

export default BucketSelector;
