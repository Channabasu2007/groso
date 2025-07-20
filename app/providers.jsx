"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster } from "react-hot-toast";

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster position="bottom-center" reverseOrder={false} />
      </ThemeProvider>
    </Provider>
  );
}
