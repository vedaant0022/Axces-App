import Config from "react-native-config";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const BASE_URL = 'https://backend.axces.in/api';
export const LOCATION_URL = 'https://nominatim.openstreetmap.org/reverse.php?'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

//Constants
export const ACCESS_TOKEN = 'axces-access-token'
export const USER_ID = 'axces-user-id'