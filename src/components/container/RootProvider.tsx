"use client";
import { ReactNode } from "react";
import SuspenseWrapper from "./SuspenseWrapper";

const RootProviders = ({ children }: { children: ReactNode }) => {
  return <SuspenseWrapper>{children}</SuspenseWrapper>;
};

export default RootProviders;
