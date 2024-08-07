import { getApi } from "../../../utils";
import { propertyUrl } from "../../../utils/api";

const GET_SELECTED_PROPERTIES = 'properties/getSelectedProperties'

const initialState = {
    called: false,
    data: null,
    status: '',
    message: '',
}

export default function (state = initialState, action: any) {
    switch (action.type) {
        case GET_SELECTED_PROPERTIES:
            return { ...state, ...action.payload };
        default:
            return { ...state, called: false };
    }
}

export function getPropertiesAction(res: any): any {
    return { type: GET_SELECTED_PROPERTIES, payload: { ...res, called: true } };
}


export const onGetProperty = (id: number) => (dispatch: any) => {
    const url = propertyUrl(id)
    getApi(url)
        .then((res: any) => {
            dispatch(getPropertiesAction({ ...res }));
        })
        .catch(err => {
            if (err) {
                dispatch(
                    getPropertiesAction({
                        ...err
                    }),
                );
            }
        });
} 