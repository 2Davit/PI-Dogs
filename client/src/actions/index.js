import { GET_BREEDS, GET_TEMPERAMENTS } from "./types";
import axios from "axios";

export const getBreeds = () => {
  return async (dispatch) => {
    const { data: payload } = await axios.get("http://localhost:3001/dogs");
    return dispatch({
      type: GET_BREEDS,
      payload,
    });
  };
};

export const getTemperaments = () => {
  return async (dispatch) => {
    const { data: payload } = await axios.get(
      "http://localhost:3001/temperament"
    );
    return dispatch({
      type: GET_TEMPERAMENTS,
      payload,
    });
  };
};
