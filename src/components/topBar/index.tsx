import { getLocationsByCompanyId } from "@/libs/action";
import { Box } from "@mui/material";
import { Locations } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import LocationAndLogout from "../LocationAndLogout";
import { prisma } from "@/libs/prisma";

export default async function TopBar() {
  const locations = await prisma.locations.findMany();

  /*   const getCurrentLocation = async () => {
    const locations = await getLocationsByCompanyId();
    const currentLocationId = Number(localStorage.getItem("currentLocationId"));

    if (!currentLocationId) {
      const firstLocation = locations[0];
      localStorage.setItem("currentLocationId", String(firstLocation.id));
    } else {
      const currentLocation = locations.find(
        (location) => location.id === currentLocationId
      );
      setCurrentLocation(currentLocation);
    }
  };
 */ return (
    <Box
      sx={{
        bgcolor: "#021e2c",
        color: "#8ecae6",
        height: "13vh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "17px",
        fontSize: "20px",
      }}
    >
      <h3>Foodie POS</h3>
      <LocationAndLogout locations={locations} />
    </Box>
  );
}
