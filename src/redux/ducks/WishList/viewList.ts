import { getApi } from "../../../utils";
import { viewListUrl } from "../../../utils/api";
import { AppDispatch } from "../../store";

const VIEW_LIST = 'wishlist/viewList'

const initialState = {
    data: null,
    called: false,
    status: '',
    message: ''
}

export default function(state = initialState, action: any) {
    switch (action.type) {
        case VIEW_LIST:
            return {
                ...state,
                ...action.payload
            }
        default:
            return  { ...state, called: false };
    }
}


export function viewListAction(res: any): any {
    return { type: VIEW_LIST, payload: { ...res, called: true } };
}   

export const viewWishList = (propertyId: string) => (dispatch: AppDispatch) => {
    const url = viewListUrl
    getApi(url)
        .then((res: any) => {
            dispatch(viewListAction({ ...res.data }));
        })
        .catch(err => {
            if (err) {
                dispatch(
                    viewListAction({
                        ...err
                    }),
                );
            }
        });
}



