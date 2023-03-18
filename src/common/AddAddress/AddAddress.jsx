import React, { useState } from "react";

import { Box, FormControl, Typography } from "@mui/material";

import "./AddAddress.css";
import AddressForm from "../AddressForm/AddressForm";
import CreatableSelect from "react-select/creatable";

const selectStyles = {
  menu: (base) => ({
    ...base,
    zIndex: 100,
  }),
};

const SelectAdd = ({ saveAddress, setSelectItemFunc }) => {
  function handleChange(e) {
    setSelectItemFunc(e.value);
  }

  const addOptions = saveAddress?.map((item) => ({
    value: item,
    label: `${item.street}, ${item.city}, ${item.state}, ${item.landmark}, ${item.zipcode}`,
  }));

  return (
    <>
      <div className="selectAddWrap">
        <Box className="selectAdd">
          <FormControl className="addressForm">
            <Typography display="inline" variant="body1" align="left">
              Select Address:
            </Typography>
            <CreatableSelect
              options={addOptions}
              clearable={false}
              styles={selectStyles}
              onChange={handleChange}
            />
          </FormControl>
        </Box>
      </div>
      <Typography className="or">-OR-</Typography>
    </>
  );
};

const AddAddress = ({ selectItem, setSelectItemFunc, Alert }) => {
  const [saveAddress, setSaveAddress] = useState([]);

  return (
    <>
      <SelectAdd
        saveAddress={saveAddress}
        selectItem={selectItem}
        setSelectItemFunc={setSelectItemFunc}
        Notice={Alert}
      />
      <AddressForm
        saveAddressFunc={setSaveAddress}
        selectItem={selectItem}
        saveAddress={saveAddress}
      />
    </>
  );
};

export default AddAddress;
