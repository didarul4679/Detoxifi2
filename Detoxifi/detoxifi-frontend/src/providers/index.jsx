"use client";

import AuthProvider from "./AuthProvider/AuthProvider";

const Providers = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default Providers;
