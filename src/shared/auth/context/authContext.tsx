/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userInfo } from "../api/auth.api";
import { User } from "../../../models/user.model";
import { useLogOutMutation } from "../../store/query/sharedQuery";
import { setLoading, setRole } from "../auth-slice/auth-slice";
import { useDispatch } from "react-redux";
interface Account {
  phoneNumber: string;
  password: string;
  type?: string;
}

const userDefault: User = {
  name: "",
  title: "",
  birthDate: "",
  phoneNumber: "",
  email: "",
  companyName: "",
  profileImage: undefined,
  emergencyContact: undefined,
  gender: "",
  enabled: false,
  address: {
    country: "",
    city: "",
    subCity: "",
    woreda: "",
    houseNumber: "",
  },
};

const AuthContext = React.createContext({
  user: userDefault,
  authenticated: false,
  login: (account: Account) => {},
  logOut: () => {},
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [loggingOut, setLoggingOut] = useState(false);
  const dispatch = useDispatch();
  const [logOutMutation, logOutResponse] = useLogOutMutation();
  const navigate = useNavigate();
  const [context, setContext] = useState({
    user: userDefault,
    authenticated: false,
    login: Login,
    logOut: logOut,
  });

  async function Login(account: Account) {
    const data = await userInfo(account);
    if (data?.id) {
      setContext({ ...context, user: data, authenticated: true });
      navigate("/");
    }
  }

  async function logOut() {
    dispatch(setLoading(true));

    logOutMutation(localStorage.getItem("accessToken") ?? "").then(
      (response: any) => {
        if (response?.data) {
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userInfo");
          localStorage.removeItem("currentRole");
          localStorage.removeItem("userRolePermissions");
          setContext({ ...context, user: userDefault, authenticated: false });
          dispatch(setRole(null));
          dispatch(setLoading(false));
          navigate("/login");
        }
      }
    );
  }

  useEffect(() => {
    async function init() {
      if ((await localStorage.userInfo) !== undefined) {
        setContext({
          ...context,
          user: JSON.parse(await localStorage.userInfo),
          authenticated: true,
        });
      }
    }
    init();
  }, []);

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
export default AuthContext;
