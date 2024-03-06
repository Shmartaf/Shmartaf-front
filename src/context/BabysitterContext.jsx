import React, { createContext, useReducer } from "react";

const initialState = {
  users: [],
  user: {
    role: "",
  },
  selected: {},
  babysitters: [],
  parents: [],
  loading: false,
  error: null,
};

const babysitterReducer = (state, action) => {
  switch (action.type) {
    case "SET_BABYSITTERS":
      return { ...state, babysitters: action.payload };

    case "SET_SELECTED":
      return { ...state, selected: action.payload };

    case "CLEAR_SELECTED":
      return { ...state, selected: {} };

    case "ADD_BABYSITTER":
      return { ...state, babysitters: [...state.babysitters, action.payload] };

    case "UPDATE_BABYSITTER":
      return {
        ...state,
        babysitters: state.babysitters.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        ),
        selected: {},
      };

    case "REMOVE_BABYSITTER":
      return {
        ...state,
        babysitters: state.babysitters.filter(
          (item) => item._id !== action.payload,
        ),
        selected: {},
      };
    case "SET_ROLE":
      return { ...state, user: { ...state.user, role: action.payload } };

    case "SET_USER":
      return { ...state, user: action.payload };

    case "SET_USERS":
      return { ...state, users: action.payload };

    default:
      return state;
  }
};

const BabysitterContext = createContext();

const BabysitterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(babysitterReducer, initialState);

  return (
    <BabysitterContext.Provider value={{ state, dispatch }}>
      {children}
    </BabysitterContext.Provider>
  );
};

export { BabysitterContext, BabysitterProvider };
