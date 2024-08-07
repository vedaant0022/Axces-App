import { balance } from "../../../utils/api";
import { getApi } from "../../../utils";
import { AppDispatch } from "../../store";

const GET_BALANCE = 'coins/getBalance'

const initialState = {
  called: false,
  data: null,
  status: '',
  message: '',
  balance: ''
}

export default function (state = initialState, action: any) {
  switch (action.type) {
    case GET_BALANCE:
      return { ...state, ...action.payload };
    default:
      return { ...state, called: false };
  }
}

export function getBalanceAction(res: any): any {
  return { type: GET_BALANCE, payload: { ...res, called: true } };
}


export const onGetBalance = () => async (dispatch: AppDispatch) => {
  const url = balance

  getApi(url)
    .then((res: any) => {
      dispatch(getBalanceAction({ ...res.data }));
    })
    .catch(err => {
      if (err) {
        dispatch(
          getBalanceAction({
            ...err
          }),
        );
      }
    });
};