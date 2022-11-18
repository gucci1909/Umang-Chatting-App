// I TRIED TO SEND DATA THROUGH STORE BUT IT WAS HAVING MANY ISSUES WITH UI FOR LOADING 
// UI WAS LOADING EVERYTIME I POST OR UPDATE OR REMOVE THE DATA
// ALSO DATA WAS NOT UPDATING IN THE UI
// YOU CAN LOOK MY OTHER PROJECTS FOR FULL FUNCTIONALITY DONE FROM REDUX

import {
  ADD_MESSAGES_SUCCESS,
  DELETE_MESSAGES_SUCCESS,
  GET_MESSAGES_ERROR,
  GET_MESSAGES_LOADING,
  GET_MESSAGES_SUCCESS,
  MODIFY_MESSAGES_SUCCESS,
} from "./crud.types";

const crudInitialState = {
  loading: false,
  error: false,
  data: [],
};

export const crudReducer = (state = crudInitialState, { type, payload }) => {
  switch (type) {
    case GET_MESSAGES_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case GET_MESSAGES_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data:payload
      };
    case ADD_MESSAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case MODIFY_MESSAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case DELETE_MESSAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    default:
      return state;
  }
};
