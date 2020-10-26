import { combineReducers } from 'redux'
import authorizationReducer from "./authorization";

// const rootReducer = combineReducers({
//     authorizationReducer
// });

const rootReducer = authorizationReducer;

export default rootReducer;