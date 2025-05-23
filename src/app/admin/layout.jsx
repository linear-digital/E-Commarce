"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
const layout = ({ children }) =>
{
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <div className="container mx-auto">

          {children}
        </div>
      </QueryClientProvider>
    </div>
  );
};

export default layout;
