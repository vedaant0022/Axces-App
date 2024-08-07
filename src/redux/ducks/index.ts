import { combineReducers } from "redux";

import profile from "./Auth/profile";
import editProfile from "./Auth/editProfile";
import getBalance from "./Coins/getBalance";
import recharge from "./Coins/recharge";
import getLocation from "./User/getLocation";
import getProperties from "./Properties/getProperties";
import addToList from "./WishList/addToList";
import viewList from "./WishList/viewList";
import getSelectedProperty from "./Properties/getSelectedProperty";
import addProperty from "./Properties/addProperty";
import contactOwner from "./User/contactOwner";
import viewProfile from "./User/viewProfile";
import verifyUser from "./User/verifyUser";

export default combineReducers({
    profile,
    editProfile,
    getBalance, 
    recharge,
    getLocation,
    getProperties,
    addToList,
    viewList,
    getSelectedProperty,
    addProperty,
    contactOwner,
    viewProfile,
    verifyUser
})