const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_SESSION":
      console.log(action.payload);
      return {
        ...state,
        ...action.payload,
      };

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload.status,
      };

    case "RESET_STATE":
      return {
        accessToken: "",
        isLoading: false,
        _id: "",
        username: "",
      };

    default:
      throw new Error();
  }
};

export default reducer;
