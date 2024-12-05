"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactElement } from "react";
const queryClient = new QueryClient();

interface Props {
  children: ReactElement;
}

const Provider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Provider;
