import axios from "axios";
import { setUserList } from "../reducer/userSlice";
export const setUserActions = () => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/getUsers");
      dispatch(setUserList(res.data.data));
    } catch (error) {
      console.log(error.message);
    }
  };
};
