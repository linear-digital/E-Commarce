"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSelector } from "react-redux";
const queryClient = new QueryClient();
const layout = ({ children }) =>
{
  const { currentUser } = useSelector(state => state.User)
  if (currentUser?.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
      </div>
    );
  }
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
