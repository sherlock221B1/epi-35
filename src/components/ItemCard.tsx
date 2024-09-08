import React, { ReactNode } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  SvgIconTypeMap,
} from "@mui/material";
import Link from "next/link";
import {
  AddonCategories,
  Addons,
  Locations,
  Menus,
  MenusCategories,
  Tables,
} from "@prisma/client";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface Props {
  name: string;
  icon: ReactNode;
}

export default function ItemCard({ name, icon }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mr: "8px",
        mt: "10px",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#8ecae6",
          color: "#023047",
          width: "170px",
          height: "170px",
          padding: "15px",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        {icon}
        <h3
          style={{
            padding: "0",
            margin: "0",
            textAlign: "center",
            marginTop: "16px",
          }}
        >
          {name}
        </h3>
      </Box>
    </Box>
  );
}
