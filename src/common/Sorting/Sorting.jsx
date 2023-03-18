import React from "react";
import { Box, FormControl, Typography } from "@mui/material";

import "./Sorting.css";

import CreatableSelect from "react-select/creatable";

const sortOptions = [
  { value: "default", label: "Default", isFixed: true },
  { value: "desc", label: "Price: High to Low" },
  { value: "asc", label: "Price: Low to High" },
  { value: "new", label: "Newest" },
];

const selectStyles = {
  menu: (base) => ({
    ...base,
    zIndex: 100,
  }),
};

const Sorting = ({ handleChangeFunc }) => {
  return (
    <div className="sorting">
      <Typography display="inline" variant="body1" align="left">
        Sort by:
      </Typography>
      <Box sx={{ minWidth: 120 }}>
        <FormControl className="sortingForm">
          <CreatableSelect
            color="primary"
            options={sortOptions}
            clearable={false}
            styles={selectStyles}
            onChange={(e) => handleChangeFunc(e.value)}
          />
        </FormControl>
      </Box>
    </div>
  );
};

export default Sorting;
