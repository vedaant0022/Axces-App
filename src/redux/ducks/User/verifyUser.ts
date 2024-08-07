import { profileUrl, verifyUserUrl } from "../../../utils/api";
import { postApi } from "../../../utils";

const VERIFY_USER = 'auth/verifyUser'

const initialState = {
    called: false,
    data: null,
    status: '',
    message: '',
    token: '',
    error: false,
}

export default function (state = initialState, action: any) {
    switch (action.type) {
        case VERIFY_USER:
            return { ...state, ...action.payload };
        default:
            return { ...state, called: false };
    }
}

export function verifyUserAction(res: any): any {
    return { type: VERIFY_USER, payload: { ...res, called: true }};
  }
  

  export const onVerifyUser = (number: number) => (dispatch: any) => {
      const url = verifyUserUrl
  
    const body = { number };
  
    postApi(url,body, {})
    .then((res: any) => {
      dispatch(verifyUserAction({ ...res.data }));
    })
    .catch(err => {
        console.log("err>>>",err)
      if (err) {
        dispatch(
          verifyUserAction({
            ...err
          }),
        );
      } 
    });
  };