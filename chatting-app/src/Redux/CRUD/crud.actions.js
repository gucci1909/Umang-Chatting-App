import {
  ADD_MESSAGES_SUCCESS,
  DELETE_MESSAGES_SUCCESS,
  GET_MESSAGES_ERROR,
  GET_MESSAGES_LOADING,
  GET_MESSAGES_SUCCESS,
  MODIFY_MESSAGES_SUCCESS,
} from "./crud.types";

// Messages get action here
export const getMessages = () => async (dispatch) => {
  dispatch({ type: GET_MESSAGES_LOADING });
  try {
    let response = await fetch(
      `https://mc-square-api-umang.onrender.com/chatting`
    );
    response = await response.json();
    dispatch({ type: GET_MESSAGES_SUCCESS, payload: response });
  } catch (error) {
    dispatch({ type: GET_MESSAGES_ERROR });
  }
};

// Messages post action here
export const addMessages = (value) => async (dispatch) => {
  try {
    let res = await fetch(`https://mc-square-api-umang.onrender.com/chatting`, {
      method: "POST",
      body: JSON.stringify(value),
      headers: {
        "Content-Type": "application/json",
      },
    });
    res = await res.json();
    console.log(res);
    dispatch({ type: ADD_MESSAGES_SUCCESS });
  } catch (error) {
    console.log(error);
  }
};

// Messages modify action here
export const updateMessages = (id, value) => async (dispatch) => {
  try {
    let res = await fetch(
      `https://mc-square-api-umang.onrender.com/chatting/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(value),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    res = await res.json();
    console.log(res);

    dispatch({ type: MODIFY_MESSAGES_SUCCESS });
  } catch (error) {
    console.log(error);
  }
};

//messages delete action here
export const removeMessages = (id) => async (dispatch) => {
  try {
    let res = await fetch(
      `https://mc-square-api-umang.onrender.com/chatting/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    res = res.json;
    console.log(res);
    dispatch({ type: DELETE_MESSAGES_SUCCESS});
  } catch (error) {
    console.log(error);
  }
};
