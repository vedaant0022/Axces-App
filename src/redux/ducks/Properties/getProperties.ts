import { postApi } from "../../../utils";
import { propertiesList } from "../../../utils/api";

const GET_PROPERTIES = 'properties/getProperties'

const initialState = {
    called: false,
    data: null,
    status: '',
    message: '',
}

export default function (state = initialState, action: any) {
    switch (action.type) {
        case GET_PROPERTIES:
            return { ...state, ...action.payload };
        default:
            return { ...state, called: false };
    }
}

export function getPropertiesAction(res: any): any {
    return { type: GET_PROPERTIES, payload: { ...res, called: true } };
}


export const getPropertiesList = (latitude: number, longitude: number, propertyType: string, pincode: string, size: string,listingType: string) => (dispatch: any) => {
    const url = propertiesList
    const body = {
        "userLatitude": latitude,
        "userLongitude": longitude,
        "filters": {
            "facilities": [
            "Gym",
            "Pool"
        ],
        "pincode": pincode,
        "bedrooms": +size,
        "bathrooms": +size,
        "listing_type": listingType,
        "propertyType": propertyType,
        },
    }
    console.log('Request Body:', body);
    postApi(url, body, {})
        .then((res: any) => {
            dispatch(getPropertiesAction({ ...res.data }));
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


