"use client";
import React from "react";
import {
  styled,
  Tooltip as MuiTooltip,
  tooltipClasses,
  TooltipProps,
} from "@mui/material";

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <MuiTooltip classes={{ popper: className }} {...props} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#3B82F6",
    color: "#f9fafb",
    fontSize: "0.875rem",
    padding: "10px 14px",
    borderRadius: "8px",
    maxWidth: 220,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#3B82F6",
  },
}));

const CustomTooltip = (props: TooltipProps) => {
  return <StyledTooltip {...props} />;
};

export default CustomTooltip;

