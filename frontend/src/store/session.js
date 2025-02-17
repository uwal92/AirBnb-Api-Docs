import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

// Thunk action to log in user
export const login = (credentials) => async (dispatch) => {
  const response = await csrfFetch("https://airbnb-api-docs.onrender.com/api/session", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  }
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("https://airbnb-api-docs.onrender.com/api/session", { method: "DELETE" });
  dispatch(removeUser());
  return response;
};

// Thunk to sign up user
export const signup = (userData) => async (dispatch) => {
    const { username, firstName, lastName, email, password } = userData;
    const response = await csrfFetch("https://airbnb-api-docs.onrender.com/api/users", {
        method: "POST",
        body: JSON.stringify({
            username,
            firstName,
            lastName,
            email,
            password
        }),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data.user));
        return response;
    }
    return response;
};

// Thunk to restore session user
export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch("https://airbnb-api-docs.onrender.com/api/session");

    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data.user));
        return response;
    }
};

const initialState = { user: null };

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
}
