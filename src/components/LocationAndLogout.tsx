import { Box } from "@mui/material";
import { Locations } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useState } from "react";

interface Props {
  locations: Locations[];
}
export default function LocationAndLogout({ locations }: Props) {
  const [currentLocation, setCurrentLocation] = useState<Locations>();

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

  return (
    <Box>
      <h3>{currentLocation?.name}</h3>
      <h3 style={{ cursor: "pointer" }} onClick={() => signOut()}>
        Log Out
      </h3>
    </Box>
  );
}
