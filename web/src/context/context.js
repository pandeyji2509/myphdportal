import { createContext, useContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import reducer from "./reducer";
import { deleteCookie, getCookie } from "../utils/Cookie";

const AppContext = createContext(null);
const useAppContext = () => useContext(AppContext);

const defaultState = {
  accessToken: "",
  _id: "",
  isLoading: false,
  isVerified: false,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [approvedUsers, setApprovedUsers] = useState([]);
  const isUserAuthenticated = () => !!state.accessToken;

  const createSession = (payload) => {
    dispatch({ type: "CREATE_SESSION", payload });
  };

  const logout = () => {
    deleteCookie("refreshToken");
    dispatch({ type: "RESET_STATE" });
  };

  const handleVerified = () => {
    if (state.accessToken) {
      return state.isVerified;
    } else return false;
  };

  const refreshAccesstoken = async (refreshToken) => {
    dispatch({ type: "SET_LOADING", payload: { status: true } });
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/api/user/refreshAccessToken`,
        {
          refreshToken,
        }
      );

      // console.log(res, res.data);
      dispatch({
        type: "CREATE_SESSION",
        payload: {
          accessToken: res.data.data.accessToken,
          username: res.data.data.user.username,
          _id: res.data.data.user._id,
        },
      });

      // dispatch({ type: "SET_LOADING", payload: { status: false } });
    } catch (error) {}
  };

  console.log(state);

  useEffect(() => {
    // const refreshToken = getCookie("refreshToken");

    // console.log(refreshToken && state.accessToken === "");

    // if (refreshToken && state.accessToken === "") {
    //   // console.log("working");
    //   refreshAccesstoken(refreshToken)
    //     .then(() => {
    //       dispatch({ type: "SET_LOADING", payload: { status: false } });
    //     })
    //     .catch((error) => console.log(error));
    //   return;
    // }

    // setTimeout(() => {}, 10000);

    // dispatch({ type: "SET_LOADING", payload: { status: false } });

    console.log(state);
  }, [state.accessToken]);

  // console.log(state);

  return (
    <AppContext.Provider
      value={{
        createSession,
        isUserAuthenticated,
        state,
        logout,
        handleVerified,
        approvedUsers,
        setApprovedUsers,
      }}
    >
      {children}
    </AppContext.Provider>

  );
};

export { useAppContext, AppProvider };
