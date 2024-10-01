import { countries } from "@datn/api/CountriesState";
import { Box, NativeSelect, OutlinedInput } from "@mui/material";
import { useMemo } from "react";

type Props = {
  country: string;
  states: string;
  handleCountryChange: (country: string) => void;
  handleStateChange: (states: string) => void;
};

export default function SelectAddress({
  country,
  states,
  handleCountryChange,
  handleStateChange,
}: Props) {
  const dataStates = useMemo(() => {
    return countries
      .filter((state) => state.country_name === country)
      .map((state) => state.name);
  }, [countries, country]);

  const uniqueCountries = useMemo(() => {
    const uniqueNames: {
      [key: number]: {
        country_id: number;
        country_name: string;
        country_code: string;
      };
    } = {};
    countries.forEach((state) => {
      if (!uniqueNames[state.country_id]) {
        uniqueNames[state.country_id] = {
          country_id: state.country_id,
          country_name: state.country_name,
          country_code: state.country_code,
        };
      }
    });
    return Object.values(uniqueNames);
  }, [countries]);

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <NativeSelect
        value={country}
        onChange={(e) => {
          handleCountryChange && handleCountryChange(e.target.value);
        }}
        input={<OutlinedInput />}
        inputProps={{
          name: "country",
          id: "country",
        }}
        className="hide-scrollbar"
        sx={{
          width: "100%",
          mb: 3,
        }}
      >
        {uniqueCountries.map((item) => {
          return <option key={item.country_id}>{item.country_name}</option>;
        })}
      </NativeSelect>
      <NativeSelect
        value={states}
        onChange={(e) => {
          handleStateChange && handleStateChange(e.target.value);
        }}
        input={<OutlinedInput />}
        inputProps={{
          name: "state",
          id: "state",
        }}
        className="hide-scrollbar"
        sx={{ width: "100%", mb: 3 }}
      >
        {dataStates.map((item, index) => {
          return <option key={index}>{item}</option>;
        })}
      </NativeSelect>
    </Box>
  );
}
