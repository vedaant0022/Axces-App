import { LOCATION_URL } from "../../../constants";
import { getApi, getLocationApi } from "../../../utils";
import { LOCATION, ownerDetailsUrl } from "../../../utils/api";

const GET_OWNER_DETAILS = 'user/getOwnerDetails'

const initialState = {
    called: false,
    data: null,
}

export default function (state = initialState, action: any) {
    switch (action.type) {
        case GET_OWNER_DETAILS:
            return { ...state, ...action.payload };
        default:
            return { ...state, called: false };
    }
}

export function getOwnerDetailsAction(res: any): any {
    return { type: GET_OWNER_DETAILS, payload: { ...res, called: true } };
}


export const onGetOwnerDetails = (id: string) => (dispatch: any) => {
    const url = ownerDetailsUrl(id)
    getApi(url).then((res: any) => {
        dispatch(
            getOwnerDetailsAction({
                ...res.data
            }),
        )
    })
        .catch(err => {
            if (err) {
                dispatch(
                    getOwnerDetailsAction({
                        ...err
                    }),
                );
            }
        });
}

