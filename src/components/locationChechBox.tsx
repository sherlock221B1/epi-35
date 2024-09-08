"use client";

import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { Locations } from "@prisma/client";

interface Props {
  id: string;
  locations: Locations[];
}
export default function LocationCheckBox({ id, locations }: Props) {
  return (
    <Box>
      <FormControlLabel
        control={
          <Checkbox
            defaultChecked={id === localStorage.getItem("currentLocationId")}
            name="currentLocationId"
            onChange={(_, checked) => {
              if (checked) {
                localStorage.setItem("currentLocationId", id);
              } else
                localStorage.setItem(
                  "currentLocationId",
                  String(locations[0].id)
                );
            }}
          />
        }
        label="Current Location"
        sx={{ color: "#023047" }}
      />
    </Box>
  );
}
