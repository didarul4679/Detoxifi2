import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import AuthContext from "../../contexts/AuthContext/AuthContext";
const AuthProvider = ({ children }) => {
  const [user, setUser_] = useState(
    localStorage.getItem("chinta_User") || null
  );
  const [loading, setLoading] = useState(true);
  const [token, setToken_] = useState(
    localStorage.getItem("accessToken_chinta")
  );

  const setToken = (newToken) => {
    console.log(newToken);
    setToken_(newToken);
  };
  const setUser = (user) => {
    setUser_(user);
  };

  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    // if (token) {
    //   axios.defaults.headers.common["Authorization"] = "bearer " + token;
    //   localStorage.setItem("accessToken_chinta", token);
    //   localStorage.setItem("chinta_User", user);
    //   fetch(base_url + `/user/me?id=${user}`, {
    //     headers: {
    //       authorization: `bearer ${localStorage.getItem("accessToken_chinta")}`,
    //     },
    //   })
    //     .then((res) => res.json())
    //     .then((data) => setUserInfo(data?.data));
    // } else {
    //   delete axios.defaults.headers.common["Authorization"];
    //   localStorage.removeItem("accessToken_chinta");
    // }
  }, [token, user]);

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      user,
      setUser,
      userInfo,
    }),
    [token, user, userInfo]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
