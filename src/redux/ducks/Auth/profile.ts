import { profileUrl } from "../../../utils/api";
import { postApi } from "../../../utils";

const REGISTER = 'auth/register'

const initialState = {
    called: false,
    data: null,
    status: '',
    message: '',
    token: ''
}

export default function (state = initialState, action: any) {
    switch (action.type) {
        case REGISTER:
            return { ...state, ...action.payload };
        default:
            return { ...state, called: false };
    }
}

export function profileAction(res: any): any {
    return { type: REGISTER, payload: { ...res, called: true }};
  }
  

  export const onCreateProfile = (name: string, email: string, number: string) => (dispatch: any) => {
      const url = profileUrl
  
    const body = { number, name, email};
  
    postApi(url,body, {})
    .then((res: any) => {
      dispatch(profileAction({ ...res.data }));
    })
    .catch(err => {
      if (err) {
        dispatch(
          profileAction({
            ...err
          }),
        );
      } 
    });
  };